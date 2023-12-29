const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/user'); 
const { requireSignIn,isAdmin,isVendor,isLicensee} = require( "../middlewares/authMiddleware");



// Create a new user
router.post('/', UserController.CreateUserController);

//login
router.post('/login',UserController.loginController);
 
//forgot password
router.post('/forgot-password',UserController.forgotPasswordController);


//current

router.get('/current',  requireSignIn ,UserController.currentUserController);


//protected user route auth

router.get('/licensee-auth',requireSignIn,isLicensee, (req,res)=>{
  res.status(200).send({ok:true});
})

//protected admin route auth

router.get('/admin-auth',requireSignIn,isAdmin, (req,res)=>{
  res.status(200).send({ok:true});
})

//protected admin route auth

router.get('/vendor-auth',requireSignIn,isVendor, (req,res)=>{
  res.status(200).send({ok:true});
})


// Retrieve all users
router.get('/', UserController.GetAllUsersController);


// Retrieve a specific user by ID
router.get('/:id', UserController.GetSingleUserController);

// Update a user by ID
router.put('/:id', UserController.UpdateUserController);


// Delete a user by ID
router.patch('/:id', UserController.softDelete);

module.exports = router;
