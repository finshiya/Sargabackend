const mongoose = require('mongoose');

const allocationSchema = new mongoose.Schema({
    // orders:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'FollowUp', 
    //     required : true
    // },
    // enqTo: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Product"
    // },
    // customer:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Enquiry', 
    //     required : true
    // },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user" // Make sure this matches your user model name
    },
    remarks: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        default: 'admin'
    },
    updatedBy: {
        type: String,
        default: 'Admin'
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
});

const Allocation = mongoose.model('Allocation', allocationSchema);

module.exports = Allocation;
