/**
 * Required External Modules
 */
 const express = require('express'); //intialise express
 const app = express(); //Intialize the app for middleware
 const router = new express.Router(); //intialize express router
 const helmet = require('helmet'); //initialize helmet for security
 const cors = require('cors');
 
 /**
  * Controller 
  */
 const customer = require('../controllers/customer.controllers') //Customer Controller
 var config;
 if (process.argv[2] == 'live') {
     config = require('../model/production.json');
 } else if (process.argv[2] == 'testing') {
     config = require('../model/testing.json');
 } else {
     config = require('../model/development.json');
 }
 app.use(helmet.xssFilter());
 
 
 
 app.use(cors());
 
router.route('/contactUs').post(customer.contactUs); //route to create contact us api.
 

module.exports = router;