/*const JWT=  require('jsonwebtoken');
const User = require("../models/user");

//PROTECTED ROUTES TOKEN BASED

exports.requireSignIn =async(req,res,next)=>{
try {

    const token = req.headers.authorization; 

    if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Token is required.',
        });
      }
      console.log('Received token:', token);
const decode = JWT.verify(token,process.env.JWT_SECRET );
console.log('Decoded token:', decode);
req.user = decode;



next();

} catch (error) {
    console.log(error);
    return res.status(401).json({
        success: false,
        message: 'Authentication failed.',
      });
}
}



//admin Access

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.userType === 'admin' && (user.userRoles === 'admin' || user.userRoles === 'operator')) {
  
      next();
    } else {
      return res.status(404).send({
        success: false,
        message: 'UnAuthorized Access',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: 'Error in admin middleware',
      error,
    });
  }
};





exports.isLicensy = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.userType === 'licensy' && (user.userRoles === 'licensy' || user.userRoles === 'operator')) {
  
      next();
    } else {
      return res.status(404).send({
        success: false,
        message: 'UnAuthorized Access',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: 'Error in licensy middleware',
      error,
    });
  }
};

//vendor acess

exports.isVendor = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.userType === 'vendor' && (user.userRoles === 'vendor' || user.userRoles === 'operator')) {
  
      next();
    } else {
      return res.status(404).send({
        success: false,
        message: 'UnAuthorized Access',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: 'Error in vendor middleware',
      error,
    });
  }
};

*/const JWT=  require('jsonwebtoken');
const User = require("../models/user");

//PROTECTED ROUTES TOKEN BASED

exports.requireSignIn = async(req,res,next)=>{
try {

    const token = req.headers.authorization; 

    if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Token is required.',
        });
      }
  
const decode = JWT.verify(token,process.env.JWT_SECRET );

req.user = decode;

next();

} catch (error) {
    console.log(error);
    return res.status(401).json({
        success: false,
        message: 'Authentication failed.',
      });
}
}
//admin Access

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.userType !== 'admin') {
      return res.status(404).send({
        success: false,
        message: 'UnAuthorized Access',
      });
    
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: 'Error in admin middleware',
      error,
    });
  }
};

exports.isLicensee = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.userType !== 'licensee' ) {
      return res.status(404).send({
        success: false,
        message: 'UnAuthorized Access',
      });
    
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: 'Error in licensee middleware',
      error,
    });
  }
};

//vendor acess

exports.isVendor = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.userType !== 'vendor') {
      return res.status(404).send({
        success: false,
        message: 'UnAuthorized Access',
      });
     
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: 'Error in vendor middleware',
      error,
    });
  }
};

