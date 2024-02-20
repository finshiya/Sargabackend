const  express = require('express');
const customerController =require('../Controllers/customer'); 

const router = express.Router();



// Create a new customer
router.post('/', customerController.CreateCustomerController);

// Get all customer
router.get('/', customerController.GetAllCustomerController);

// Update an existing customer by ID
router.put('/:id', customerController.UpdateCustomerController);


// Get a single customer by ID
router.get('/:id', customerController.GetSingleCustomerController);

// Delete an customer by ID
router.patch('/:id',customerController.softDelete);

// Delete an customer by ID
router.get('/total/count',customerController.customerCount);

module.exports = router;
