
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    enqNo: {
        type: String,
        unique: true
    },
    followUpData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FollowUp",
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    mobile: {
        type: Number,
        required: true
    },
    wtsApp: {
        type: Number,
        required: true
    },
    landMark: {
        type: String,
    },
    pincode: {
        type: Number,
        required: true
    },
    district: {
        type: String
    },
    location: {
        type: String
    },
    address: {
        type: String
    },
    state: {
        type: String
    },
    enqSource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EnquirySource"
    },
    enqType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EnquiryType"
    },
    enqMode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enquirymode"
    },

    custDescp: {
        type: String,
    },
   
    leadQuality: {
        type: String,
        enum: ["High", "Medium", "Low"]
    },
    enqTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    status: {
        type: String,
        enum: ['new', 'active', 'pending', 'blocked', 'converted']
    },
    referenceId: {
        type: String
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

const Customer = mongoose.model('Customer', customerSchema);

module.exports =Customer;