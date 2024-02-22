const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const rateLimit =require('express-rate-limit');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const multer = require('multer');
const path = require("path")


const dotenv = require("dotenv").config();

const port =process.env.PORT || 3000

var corsOptions = {
  origin: "http://localhost:8000"
};


app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));



//GLOBAL MIDDLEWARE

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1000, // Limit each IP to 5 requests per hour
  message: "Too many requests from this IP, please try again in an hour",
});

app.use("/", limiter);


//IMPORT ROUTES 
const userProfileRoutes = require('./app/routes/userProfile');
app.use('/userProfile', userProfileRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/public/Images', express.static(path.join(__dirname, 'public/Images')));



const customer = require('./app/routes/customer');
app.use("/customers",customer);

const user= require('./app/routes/user');
app.use("/users",user);

// const userRole = require('./app/routes/userRole');
// app.use("/userroles",userRole);

const enquirySupportRoutes = require('./app/routes/enquirySupport');
app.use("/support",enquirySupportRoutes);

const enquirySource = require('./app/routes/enquirySource');
app.use("/enquirySource" ,enquirySource);

const EnquiryMode = require('./app/routes/enquiryMode');
app.use("/enquirymode",EnquiryMode)

const enquiryType = require('./app/routes/enquiryType');
app.use("/enquiryType",enquiryType)

const OrgType = require('./app/routes/orgType');
app.use("/orgType",OrgType);

const OrgCategory = require('./app/routes/orgCategory');
app.use("/orgCategory",OrgCategory);

const ProductServices = require('./app/routes/productServices');
app.use("/productService",ProductServices);

const SupportType = require('./app/routes/supportType');
app.use("/supportType",SupportType);

const Order = require('./app/routes/order');
app.use("/orders",Order);

const OrgProfile = require('./app/routes/orgProfile');
app.use("/orgProfile",OrgProfile);

const paymentRoutes = require('./app/routes/collection');
app.use("/collections",paymentRoutes);

const allocation = require('./app/routes/allocation');
app.use("/allocation",allocation);

//mongodb connection
const dbConfig = require('./config/dbconfig');


mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Database Connected Successfully!!");
}).catch(err => {
  console.log('Could not connect to the database', err);
  process.exit();
});

app.get('/', (req, res) => {
  res.json({ "message": "Hello Server started" });
});

  app.listen(port, () => {
    console.log("Server is listening on port 3000");
  }); 
