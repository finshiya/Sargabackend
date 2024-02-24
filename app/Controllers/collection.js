// paymentController.js
const mongoose = require('mongoose');
const Payment = require('../models/collection');

exports.createPayment = async (req, res) => {
  try {
    const { orders, paymentAmount, paymentMethod, transactionId } = req.body;
    const maxEnqNo = await Payment.find().sort({ recieptId: -1 }).limit(1);

    let newRcptNo;
    if (maxEnqNo.length > 0) {
      // Extract the number part of the enqNo and increment it
      const currentEnqNo = parseInt(maxEnqNo[0].recieptId.split('-')[1]);
      newRcptNo = `RCPT-${currentEnqNo + 1}`;
    } else {
      // If no existing enqNo, start with ENQ-0
      newRcptNo = 'RCPT-0';
    }
    const payment = new Payment({
    
      orders,
      recieptId: newRcptNo,
       paymentAmount,
      paymentMethod,
      transactionId,
    });

    const savedPayment = await payment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
 
exports.getAllPayments = async (req, res) => {
  // try {
  //   const Payments = await Payment.find().sort({ createdAt: -1 })
   
  //   .populate("enqId");
  //   res.status(200).send({
  //     success: true,
  //     message: 'All Collctions',
  //     Payments,
  //   });
  try {
    const Payments = await Payment.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .populate("orders")
      // .populate("enqTo");

    res.status(200).send({
      success: true,
      message: "All Payments",
      Payments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting all Collctions',
      error,
    });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// exports.getOrdersByPaymentId = async (req, res) => {
//   try {
//     const { paymentId } = req.params;
//     const orders = await Payment.find({ payments: paymentId }).populate('enqId');
//     res.status(200).json({ success: true, orders });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };


// Get payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get payments by Enquiry ID
exports.getOrdersByPaymentId = async (req, res) => {
  try {
    const {  OrderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(OrderId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid payment ID provided",
      });
    }  

    // const payment = await Payment.find({ orders:  OrderId }).sort({
    //   createdAt: -1,
    // });
    const payment = await Payment.find({ orders:  OrderId  })
    .sort({ createdAt: -1 })
    .populate("orders")

    res.status(200).send({
      success: true,
      message: "All payment for the enquiry",
      payment,
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
// exports.getOrdersByPaymentId = async (req, res) => {
//   try {
//     const { enquiryId } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(enquiryId)) {
//       return res.status(400).send({
//         success: false,
//         message: 'Invalid Enquiry ID provided',
//       });
//     }

//     const payments = await Payment.find({ enqId: enquiryId }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, payments });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, error: 'Error in getting payments for the enquiry', error });
//   }
// };

// exports.getOrdersByPaymentId = async (req, res) => {
//   try {
//     const { enquiryId } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(enquiryId)) {
//       return res.status(400).send({
//         success: false,
//         message: 'Invalid Enquiry ID provided',
//       });
//     }

//     const payments = await Payment.find({ enqId: enquiryId }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, payments });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, error: 'Error in getting payments for the enquiry', error });
//   }
// };

// exports.getOrdersByPaymentId = async (req, res) => {
//   try {
//     const { order } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(order)) {
//       return res.status(400).send({
//         success: false,
//         message: "Invalid Orders ID provided",
//       });
//     }

//     const payment = await Payment.find({ enqId: order }).sort({
//       createdAt: -1,
//     });

//     res.status(200).send({
//       success: true,
//       message: "All payment for the enquiry",
//       payment,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in getting orders for the enquiry",
//       error,
//     });
//   }
// };


exports.updatePayment = async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedPayment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(200).json(updatedPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
    if (!deletedPayment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

