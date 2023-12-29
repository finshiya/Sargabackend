const mongoose = require('mongoose');

const enquirySourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending', // 'Pending', 'Contacted', 'Closed'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: String, // If this is meant to store user information, consider using a reference to a user model.
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
});

const EnquirySource = mongoose.model('EnquirySource', enquirySourceSchema);

module.exports = EnquirySource;
