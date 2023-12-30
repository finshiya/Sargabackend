const User = require("../models/user");
const { hashPassword,comparePassword } = require("../helpers/authHelper");
const JWT =  require('jsonwebtoken');

 
// Create User
exports.CreateUserController = async (req, res) => {
  try {
    const { fname,lname, email , mobile, password,userType,userRoles} = req.body;

    if (!fname  ) {
      return res.send({ error: "FirstName is Required" });
    }
    if (!lname  ) {
      return res.send({ error: "LastName is Required" });
    }

    if (!email  ) {
      return res.send({ error: "Email is Required" });
    }
    if (!mobile  ) {
      return res.send({ error: "Mobile is Required" });
    }
    
    if (!password  ) {
      return res.send({ error: "Password is Required" });
    }


    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User with this email already exists",
      });
    }
      
     //REGISTER user

 const hashedPassword = await hashPassword(password)
 //save 
 
 const user = await new User({ 
    fname,
    lname,
    email,
    mobile,
    password:hashedPassword,
    confirmPassword:hashedPassword,
    userType,
    status :'new',
    userRoles,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy :'admin',
    updatedBy :'admin',
    isDeleted: false
}).save()

    res.status(201).send({
      success: true,
      message: "Successfully created a user",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating a user",
      error,
    });
  }
};

//LOGIN USER

exports.loginController =async(req,res)=>{
    try{

const {email,password}=req.body
//validation

if(!email|| !password){
    return res.status(404).send({
        success:false,
        message:"Invalid email or password"
    })
}
//check  user
const user = await User.findOne({email})

if(!user){
    return res.status(404).send({
        success:false,
        message:'Email is not Registered'
    })
}


  const match = await comparePassword(password,user.password)

if(!match){
    return res.status(404).send({
        success:false,
        message:'Invalid Password'
    })
}
//token
const token = await JWT.sign(
    { _id:user._id},
    process.env.JWT_SECRET,
    {expiresIn:'7d',
});
res.status(200).send({
    success:true,
    message:'Login successfully',
    user:{
        _id: user._id,
        fname:user.fname,
        lname:user.lname,
        mobile:user.mobile,
        email:user.email,
        userType:user.userType,
        userRoles:user.userRoles

    },token
})


    }catch(error){
console.log(error);
res.status(500).send({
    success:false,
    message:'Error in login',
    error
})
    }
};


//FORGOT PASSWORD

exports.forgotPasswordController = async(req,res) =>{
  try {
      
      const {email,mobile,newPassword} =req.body
      if(!email){
          res.status(400).send({ message:"Email is Required"})
      }
      if(!mobile){
          res.status(400).send({ message:"contactNo is Required"})
      }
      if(!newPassword){
          res.status(400).send({ message:"newPassword is Required"})
      }
      // check
       const user = await User.findOne({email,mobile})
       // validation

       if(!user){
         res.status(401).send({
          success:false,
          message:"Wrong Email or answer"
         })
       }
       const hashed = await hashPassword(newPassword)
       await User.findByIdAndUpdate(user._id ,{password:hashed})
       res.status(201).send({
          success:true,
          message:'Successfully Reset the Password'
       });

  } catch (error) {
      console.log(error);
      res.status(500).send({
          success:false,
          message:"Something went wrong",
          error
      })
  }
} ;



//CURRENT USER

exports.currentUserController =async(req,res)=>{
  try {
         
  res.send("Protected Route"); 
  } catch (error) {
      console.log(error);
    res.send({error})  
  }
  }
  


// UPDATE USER
exports.UpdateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;


    const user = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    }) .populate('userRoles');

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully updated the user",
      user: updatedData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating the user",
      error,
    });
  }
};

// Get all Users
exports.GetAllUsersController = async (req, res) => {

  try {

    const users = await User.find().sort({ createdAt :-1}) 
    .populate('userRoles');
    res.status(200).send({
      success: true,
      message: "All users",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all users",
      error,
    });
  }
};

// Get Single User by ID
exports.GetSingleUserController = async (req, res) => {
  try {
    const {id} = req.params;

    const user = await User.findById(id)
   .populate('userRoles');
 
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Getting single user successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting a single user",
      error,
    });
  }
};

// Delete User by ID
exports.softDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, 
     { isDeleted: true, updatedAt: Date.now() },
     { new: true, runValidators: true })
     .populate('userRoles');

    res.status(200).send({
      success: true,
      message: "Successfully deleted the user",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting the user",
      error,
    });
  }
};
