const Order = require("../models/order");
const mongoose = require("mongoose");
const moment = require("moment");
/*
// Function to format date as "DD-MM-YYYY"
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
*/
// Create order
exports.CreateOrder = async (req, res) => {
  try {
    const { enqId, orderDetails, nextContactDate, remarks } = req.body;

    if (!mongoose.Types.ObjectId.isValid(enqId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Order ID provided",
      });
    }
 /*   const parsedNextContactDate = new Date(nextContactDate);

    if (isNaN(parsedNextContactDate.getTime())) {
      return res.status(400).send({
        success: false,
        message: "Invalid nextContactDate provided",
      });
    }
*/


const maxEnqNo = await Order.find().sort({ OrderId: -1 }).limit(1);

let newEnqNo;
if (maxEnqNo.length > 0) {
  // Extract the number part of the enqNo and increment it
  const currentEnqNo = parseInt(maxEnqNo[0].OrderId.split('-')[1]);
  newEnqNo = `ORD-${currentEnqNo + 1}`;
} else {
  // If no existing enqNo, start with ENQ-0
  newEnqNo = "ORD-0";
}

//     const followUp = await new FollowUp({
//       enqId,
//       enqTo,
//       OrderId: newEnqNo ,

    const order = await new Order({
      OrderId: newEnqNo ,
      enqId,
      enqTo,
      orderDetails,
      nextContactDate ,
      status :"new",
      remarks,
      createdBy: 'admin',
      updatedBy: 'admin',

    }).save();

    res.status(201).send({
      success: true,
      message: "Successfully created a order",
      order 
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating a order",
      error,
    });
  }
};

// Get all Order
exports.GetAllOrders = async (req, res) => {
  try {
    const order = await Order.find({isDeleted:false}).sort({ createdAt: -1 })
      // .populate('enqId')
      // .populate('enqTo') ;
      .populate('enqId')
      .populate('enqTo')


    res.status(200).send({
      success: true,
      message: "All order",
      order
      
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all orders",
      error,
    });
  }
};

// Get Order by id
exports.GetSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID provided",
      });
    }

    const order = await Order.findById(id)
      .populate('enqId')
      .populate('enqTo') ;  

    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }
    

    res.status(200).send({
      success: true,
      message: "Getting single order successfully",
      order 
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting a single order",
      error,
    });
  }
};

// Get all order for a specific Enquiry
// Get all FollowUps
exports.GetAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({isDeleted:false}).sort({ createdAt: -1 })
      .populate('enqId')
      .populate('enqTo');


    res.status(200).send({
      success: true,
      message: "All Orders",
      orders
      
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all Orders",
      error,
    });
  }
};
 

// Update Order by id
exports.UpdateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const order = await Order.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    }).populate('enqId')
    .populate('enqTo');

    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully updated the order",
      order: updatedData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating the order",
      error,
    });
  }
};

// Soft Delete order by ID
exports.softDeleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(
      id,
      { isDeleted: true, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).populate('enqId')
    .populate('enqTo'); 
    if (!order) {
      return res.status(404).send({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Successfully soft-deleted the Order',
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in soft-deleting the order',
      error,
    });
  }
};
