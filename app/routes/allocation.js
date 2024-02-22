// routes/AllocationRoutes.js
const express = require('express');
const router = express.Router();
const AllocationController = require('../Controllers/allocation');

router.post('/', AllocationController.createAllocationController);
router.get('/', AllocationController.getAllAllocationsController);
router.get('/:id', AllocationController.getSingleAllocationController);
router.put('/:id', AllocationController.updateAllocationController);
router.patch('/:id', AllocationController.softDeleteAllocation);

module.exports = router;