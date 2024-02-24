const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/order');

// Create a Order
router.post('/', orderController.CreateOrder);

// Get all Order
router.get('/', orderController.GetAllOrders);

// Get a single Order by ID
router.get('/:id', orderController.GetSingleOrder);


//get all order for enquiry
router.get('/enqId/:enquiryId', orderController.GetAllOrdersEnq);

// Update a Order by ID
router.put('/:id', orderController.UpdateOrder);

// Soft Delete a Order by ID
router.patch('/:id', orderController.softDeleteOrder);

module.exports = router;
