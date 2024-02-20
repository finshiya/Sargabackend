const Payment = require('../models/collection');

exports.createPayment = async (req, res) => {
  try {
    const { enqId, paymentAmount, paymentMethod, transactionId } = req.body;
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
    
      enqId,
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
 


// exports.getAllPayments = async (req, res) => {
//   try {
//     const product = await Payment.find({isDeleted:false}).sort({ createdAt :-1})  
//     .populate('followUpData')
//     res.status(200).send({
//       success: true,
//       message: "All Payment",
//       Payment,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in getting all Payment",
//       error,
//     });
//   }
// };

exports.getAllPayments = async (req, res) => {
  try {
    const Payments = await Payment.find().sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: 'All Collctions',
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
