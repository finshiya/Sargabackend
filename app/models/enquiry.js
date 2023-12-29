const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({

  enqNo:{
  type:Number,
  unique:true
  },
  followUpData: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FollowUp",
    },
  enqSource: {
    type: mongoose.Schema.Types.ObjectId ,
    ref:"EnquirySource" 
   },
   enqType:{
    type: mongoose.Schema.Types.ObjectId ,
    ref:"EnquiryType" 
   },

  enqMode: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Enquirymode"
   },
  
   supportType: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"SupportType"
   },
  
    enqDescp:{
      type: String 
     },
  
    fName: { 
    type: String ,
    required:true
  },
    lName: { 
    type: String ,
    required:true
  },

    gender:{
     type:String
    },
     email:{
      type: String,
      unique:true,
      required:true
     },
     
     mobile:{
      type:Number,
      required:true
     },
     district:{
    type: String
     },
     location:{
      type: String
    },
       state:{
        type:String
       },
 
    leadQuality: {
     type: String ,
     enum:["High","Medium","Low"]
     },

     enqTo: { 
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Product' 
  
    },
    status: {
      type: String,
      enum:['new','active','pending','blocked','converted']
      },

      referenceId:{
      
        type: String
      },
     remarks:{
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
  createdBy:{
  /*  type: mongoose.Schema.Types.ObjectId,
    ref: 'user' */
    type:String,
    default:'admin'
  
  },
   updatedBy:{
  /*  type: mongoose.Schema.Types.ObjectId,
    ref: 'user' */
    type:String,
    default:'admin'
    
  },

  isDeleted:{
    type: Boolean,
    default: false, 
  }
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;




  