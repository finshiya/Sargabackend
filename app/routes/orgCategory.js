const express = require("express");
const OrgCategory = require('../Controllers/orgCategory'); 

const router = express.Router();

// Create a new organization category
router.post('/', OrgCategory.createOrgCategory);

// Get all organization categories
router.get('/', OrgCategory.getAllOrgCategory);

// Update an existing organization category by ID
router.put('/:id', OrgCategory.updateOrgCategory);

// Get count of organization categories
router.get('/count', OrgCategory.findTotalOrgCategory);


// Get count of organization categories
//router.get('/active-count', OrgCategory.findActiveOrgCatgCount);

// Soft Delete Organization Category by ID
router.patch('/:id', OrgCategory.softDeleteOrgCategory);

// Hard Delete Organization Category by ID
//router.delete('/hard-delete/:id', OrgCategory.hardDeleteOrgCategory);

// Get a single organization category by ID
router.get('/:id', OrgCategory.getSingleOrgCategory);

module.exports = router;
