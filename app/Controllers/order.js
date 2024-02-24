// Update the Order model if necessary to include fields for expand row data
const Order = require("../models/order");
const mongoose = require("mongoose");

// Create order
exports.CreateOrder = async (req, res) => {
  try {
    const { enqId, enqTo, orderDetails, nextContactDate, remarks } = req.body;

    if (!mongoose.Types.ObjectId.isValid(enqId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Order ID provided",
      });
    }
    const maxEnqNo = await Order.find().sort({ OrderId: -1 }).limit(1);

    let newEnqNo;
    if (maxEnqNo.length > 0) {
      const currentEnqNo = parseInt(maxEnqNo[0].OrderId.split("-")[1]);
      newEnqNo = `ORD-${currentEnqNo + 1}`;
    } else {
      newEnqNo = "ORD-0";
    }

    const order = await new Order({
      OrderId: newEnqNo,
      enqId,
      orderDetails,
      nextContactDate,
      remarks,
      enqTo,
      status: "new",
      createdBy: "admin",
      updatedBy: "admin",
    }).save();

    res.status(201).send({
      success: true,
      message: "Successfully created an order",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating an order",
      error,
    });
  }
};

// Get all Order with expand row data
exports.GetAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .populate("enqId")
      .populate("enqTo");

    res.status(200).send({
      success: true,
      message: "All orders",
      orders,
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

    const order = await Order.findById(id).populate("enqId").populate("enqTo");

    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Getting single order successfully",
      order,
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
// Get all order for a specific Enquiry
exports.GetAllOrdersEnq = async (req, res) => {
  try {
    const { enquiryId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(enquiryId)) {
      
      return res.status(400).send({
        success: false,
        message: "Invalid Orders ID provided",
      });
    }

    // const orders = await Order.find({ enqId: enquiryId }).sort({
    //   createdAt: -1,
    // });

    const orders = await Order.find({ enqId: enquiryId }).sort({ createdAt: -1 })
      .populate('enqId')
      .populate('enqTo');

    res.status(200).send({
      success: true,
      message: "All orders for the enquiry",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting orders for the enquiry",
      error,
    });
  }
};


// exports.GetAllOrdersEnq = async (req, res) => {
//   try {
//     const orders = await Order.find({isDeleted:false}).sort({ createdAt: -1 })
//       .populate('enqId')
//       .populate('enqTo');

//     res.status(200).send({
//       success: true,
//       message: "All Orders",
//       orders

//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in getting all Orders",
//       error,
//     });
//   }
// };

// Update Order by id
exports.UpdateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const order = await Order.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    })
      .populate("enqId")
      .populate("enqTo");

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
    )
      .populate("enqId")
      .populate("enqTo");
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully soft-deleted the Order",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in soft-deleting the order",
      error,
    });
  }
};
