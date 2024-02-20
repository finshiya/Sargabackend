const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
 
  fname:{
    type: String,
    required: true,
  },
  lname:{
    type:String,
    required:true
   },
   email :{
    type:String,
    required:true
  },

  mobile: {
    type: String,
    required: true,
    unique: true,
   
  },
 
  password: { 
    type: String,
    required: true 
  },

  picture: { 
    type: String, 
  },

  userType:{
    type:String,
    // required:true,
    enum:['admin', 'licensee','vendor'],
    default:'licensee'
    
  },
    
  userRoles:{
    
      type: String,
      required: true,
      enum:['admin', 'licensee','vendor','operator','accountant']
    },
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'UserRole', 
  //  required:true
    
 
  deviceId:{
    type:String,
   
  },
  ftLogin:{
    type:Boolean,
  
  },
  vStatus:{
    type:String,
   
  },
  status: {
    type: String,
    enum:['new','active','pending','blocked','converted']
  
  },
  crdtLmt:{
    type:Number,
  },
  country:{
   type:String,
   
  },
  curncyCode:{
   type:String,
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
    type:String,
    default:'admin'
  
  },
   updatedBy:{
    type:String,
    default:'admin'   
  },
   isDeleted :{
  type:Boolean,
  default:false
}
});

const user = mongoose.model("user", UserSchema);

module.exports = user;
