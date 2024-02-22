const mongoose = require('mongoose');
const moment = require('moment');

const orderSchema = new mongoose.Schema({

enqId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', 
    required : true
},
enqTo:{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Product', 
  required : true
},
OrderId: {
  type: String,
  unique: true
},
orderDetails:{
  type: String, 
},
nextContactDate: {
  type: String,
  
},
status: {
  type: String,
  enum:['new','active','pending','blocked','converted']
  },
remarks:{
  type:String
},

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy:{
    type: String,
    required: true,
    default:'admin'

},
    updatedBy:{
    type: String,
    required: true,
    default:'admin'
},

isDeleted: {
  type: Boolean,
  default: false, 
},

});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
