// paymentRoutes.js

const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/collection');
const multer = require('multer');
const path = require('path');
   
router.post('/', paymentController.createPayment);
router.get('/', paymentController.getAllPayments);
router.get('/:id', paymentController.getPaymentById);
// router.get('/enqId/:enquiryId', paymentController.GetAllpaymentEnq);
router.get('/orders/:OrderId', paymentController.getOrdersByPaymentId);
 

router.put('/:id', paymentController.updatePayment);
router.delete('/:id', paymentController.deletePayment);

module.exports = router;
