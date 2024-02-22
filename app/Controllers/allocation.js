// controllers/AllocationControllers.js
const Allocation = require('../models/allocation');

// Create Allocation
exports.createAllocationController = async (req, res) => {
  try {
    const { user, remarks, customer, orders, enqTo } = req.body;

    if (!remarks || !user  ) {
      return res.status(400).send({ message: 'All required fields must be provided' });
    }

    const newAllocation = await new Allocation({
      // enqTo,
      // orders,
      // customer,
      user,
      remarks,
      createdAt: new Date(),
      updatedBy: req.id,
      isDeleted: false
    }).save();

    res.status(201).send({
      success: true,
      message: 'Successfully created an allocation',
      Allocation: newAllocation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in creating an allocation',
      error,
    });
  }
};

// Update Allocation
exports.updateAllocationController = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, remarks, customer, orders, enqTo} = req.body;

    const updatedAllocation = await Allocation.findByIdAndUpdate(
      id,
      { user, remarks, customer, orders, enqTo, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedAllocation) {
      return res.status(404).send({
        success: false,
        message: 'Allocation not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Successfully updated the Allocation',
      Allocation: updatedAllocation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in updating the Allocation',
      error,
    });
  }
};

/// Get all Allocation
exports.getAllAllocationsController = async (req, res) => {
    try {
      // .populate('customer').populate('orders').populate('enqTo')
      const Allocations = await Allocation.find().populate('user').sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        message: 'All Allocation',
        Allocations,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: 'Error in getting all Allocation',
        error,
      });
    }
  };
  
// Get Single Allocation by ID
exports.getSingleAllocationController = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({
        success: false,
        message: 'Invalid ID format',
      });
    }

    const singleAllocation = await Allocation.findById(id);

    if (!singleAllocation) {
      return res.status(404).send({
        success: false,
        message: 'Allocation not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Getting single Allocation successfully',
      Allocation: singleAllocation,
    });
  } catch (error) {
    console.error('Error in getSingleAllocationController:', error);
    res.status(500).send({
      success: false,
      message: 'Error in getting a single Allocation',
      error,
    });
  }
};

// Delete Allocation by ID
exports.softDeleteAllocation = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAllocation = await Allocation.findByIdAndUpdate(
      id,
      { isDeleted: true, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!deletedAllocation) {
      return res.status(404).send({
        success: false,
        message: 'Allocation not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Successfully deleted the Allocation',
      Allocation: deletedAllocation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in deleting the Allocation',
      error,
    });
  }
};
