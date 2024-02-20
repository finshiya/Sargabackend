
const Customer = require("../models/customer");
const cron = require('node-cron');

exports.CreateCustomerController = async (req, res) => {
  try {
    const {
     
      enqSource,
      enqType,
      enqMode,
      custDescp,
      fName,
      lName,
      gender,
      email,
      mobile,
      wtsApp,
      address,
      district,
      location,
      landMark,
      pincode,
      state,
      leadQuality,
      enqTo,
      referenceId,
      remarks,
    } = req.body;

    if (  !fName || !lName || !email ||!mobile || !location ) {
      return res.status(400).send({ message: "All required fields must be provided" });
    }

    const existingCustomer = await Customer.findOne({email});

    if (existingCustomer) {
      return res.status(200).send({
        success: true,
        message: "Customer with this email already exists",
      });
    }



const maxEnqNo = await Customer.find().sort({ enqNo: -1 }).limit(1);

let newEnqNo;
if (maxEnqNo.length > 0) {
  // Extract the number part of the enqNo and increment it
  const currentEnqNo = parseInt(maxEnqNo[0].enqNo.split('-')[1]);
  newEnqNo = `CUST-${currentEnqNo + 1}`;
} else {
  // If no existing enqNo, start with ENQ-0
  newEnqNo = 'CUST-0';
}
    const customer =  new Customer({
      enqNo: newEnqNo,
      enqSource,
      enqType,
      enqMode,
      // supportType,
      custDescp,
      fName,
      lName,
      gender,
      email,
      wtsApp,
      address,
      mobile,
      landMark,
      district,
      location,
      pincode,
      state,
      leadQuality,
      enqTo,
      status :'new',
      referenceId,
      remarks,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy :'admin',
      updatedBy :'admin',
      isDeleted: false
    }).save();

    res.status(201).send({
      success: true,
      message: "Successfully created an customer",
      customer,
    });
  } catch (error) {
    console.log(error);


    if (error.code === 11000 && error.keyPattern.email) {
      return res.status(400).send({
          success: false,
          message: "Email must be unique. The provided email is already in use."
      });
  }

    res.status(500).send({
      success: false,
      message: "Error in creating an customer",
      error,
    });
  }
};

// Function to check and update the status
const checkAndUpdateStatus = async () => {
  try {
    const enquiries = await Customer.find({ status: 'new', isDeleted: false });

    enquiries.forEach(async (customer) => {
      const createdDate = new Date(customer.createdAt);
      const currentDate = new Date();

      // Check if the created date is in the future
      if (createdDate > currentDate) {
        console.warn(`Customer ${customer._id} has a future created date.`);
        return;
      }

      const timeDifference = currentDate - createdDate;

      if (timeDifference > 24 * 60 * 60 * 1000) {
        await Customer.findByIdAndUpdate(customer._id, { status: 'pending' });
      }
    });
  } catch (error) {
    console.error('Error checking and updating status:', error);
  }
};

// Run the checkAndUpdateStatus function every hour
cron.schedule('0 * * * *', () => {
  checkAndUpdateStatus();
});


// Get all Enquiries
exports.GetAllCustomerController = async (req, res) => {
  try {

    const { page = 1, pageSize = [] } = req.query;
    const skip = (page - 1) * pageSize;
    const customer = await Customer.find({isDeleted:false}).sort({ createdAt :-1}).skip(skip).limit(pageSize)
    .populate('followUpData', '_id')
    .populate('enqSource')
    .populate('enqType')

    
    .populate('enqMode')
    .populate('enqTo')
    // .populate('supportType');

    const formattedEnquiries = customer.map((enq) => ({
      ...enq.toObject(),
      followUpDataPrsnt: enq.followUpData && enq.followUpData.length > 0,
    }));



    res.status(200).send({
      success: true,
      message: "All enquiries",
      customer:formattedEnquiries,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all enquiries",
      error,
    });
  }
};

// Get Single customer by ID
exports.GetSingleCustomerController = async (req, res) => {

  try {
      const {id} = req.params.id;

    const customer = await Customer.findById(id)
    .populate('enqSource')
    .populate('enqType')
    .populate('enqMode')
    .populate('enqTo')
    // .populate('supportType');

    if (!customer) {
      return res.status(404).send({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Getting single customer successfully",
      customer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting a single customer",
      error,
    });
  }
};

// Update customer
exports.UpdateCustomerController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const customer = await Customer.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    }).populate('enqSource')
    .populate('enqType')
    .populate('enqMode')
 
    // .populate('supportType');
    

    if (!customer) {
      return res.status(404).send({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully updated the customer",
      customer: updatedData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating the customer",
      error,
    });
  }
};

// Delete customer by ID
exports.softDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndUpdate(id,
    { isDeleted: true, updatedAt: Date.now() },
    { new: true, runValidators: true })
    // .populate('enqSource')
    .populate('enqType')
    .populate('enqMode')
    .populate('enqTo')
    // .populate('supportType');

    res.status(200).send({
      success: true,
      message: "Successfully deleted the customer",
      customer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting the customer",
      error,
    });
  }
};

//customer count
exports.customerCount = async(req,res)=>{

  try {
 const  customer = await Customer.find({}).countDocuments()
 res.status(200).send({
  success:true,
  customer
})
  } catch (error) {
      console.log(error);
      res.status(500).send({
          success:false,
          message:"Error in getting count",
          error
      })
}
}