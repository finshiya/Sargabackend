const  express = require('express');
const OrgType =require('../Controllers/orgType'); 

const router = express.Router();


// Create a new enquiry
router.post('/', OrgType.createOrgType);

// Get all enquiries
router.get('/', OrgType.getAllOrgTypes);

// Update an existing enquiry by ID
router.put('/:id', OrgType.updateOrgType);


// Soft Delete Organization Type by ID
router.patch('/:id', OrgType.softDeleteOrgType);


// Get a single enquiry by ID
router.get('/:id', OrgType.getSingleOrgType);

module.exports = router;
