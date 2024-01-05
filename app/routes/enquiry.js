const  express = require('express');
const enquiryController =require('../Controllers/enquiry'); 

const router = express.Router();



// Create a new enquiry
router.post('/', enquiryController.CreateEnquiryController);

// Get all enquiries
router.get('/', enquiryController.GetAllEnquiriesController);

// Update an existing enquiry by ID
router.put('/:id', enquiryController.UpdateEnquiryController);


// Get a single enquiry by ID
router.get('/:id', enquiryController.GetSingleEnquiryController);

// Delete an enquiry by ID
router.patch('/:id',enquiryController.softDelete);

// Delete an enquiry by ID
router.get('/total/count',enquiryController.enquiryCount);

module.exports = router;
