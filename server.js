/**
 * Required External Modules
 */
require('./model/connection.js'); //Databse Connection and DB Model Mapping (Mongoose Model)
const bodyParser = require('body-parser'); //This libarary is used for parsing the http req.body as json/utc endcoded text
const express = require('express'); //This Library is used for creating web api's its used as middleware
const morgan = require('morgan'); //This is used for HTTP request logger middleware for node.js
const path = require('path'); // The path module provides utilities for working with file and directory paths
const helmet = require('helmet'); //Helmet helps you secure your Express apps by setting various HTTP headers
const swaggerUi = require('swagger-ui-express'); //This is used for API Documentation View
const swaggerDocument = require('./docs/swagger.json'); //This has the Definitions of all the end points of our
const cors = require('cors'); //cross orgin resource sharing
/**
 * App Variables
 */
const app = express(); //initial express app
const port = process.env.PORT || 1002; //running in 1002 port


app.use(bodyParser.json()); //Parse JSON Request as JSON
app.use(bodyParser.urlencoded({ extended: true })); //Encode the Req with URL Encoding


//Frameguard mitigates clickjacking attacks by setting the X-Frame-Options header.
app.use(helmet({
    frameguard: {
        action: 'deny'
    }
}));

app.use(cors()); //adding cors to the request via middleware
//allow OPTIONS on all resources
app.options('*', cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
//This route to check the api is running or not.
app.use('/test', function(req, res, next) {
    res.status(200).json({ success: true, message: "I am Up and Running" })
})

//Route For Viewing API Documentation "/APIDoc"
app.use('/APIDoc', function(req, res, next) {
    swaggerDocument.host = req.get('host');
    req.swaggerDoc = swaggerDocument;
    next();
}, swaggerUi.serve, swaggerUi.setup());
const routes = require('./routes/index.js'); //Unauthenticated routes
app.use('/api/v1/', routes); /* ------ Un authorize Routes ------ */
app.use('/node_modules', express.static(path.join(__dirname + '/node_modules'))); //reference the BackEnd as node_modules
morgan.token('host', function(req, res) {
    return req.hostname; //gets the host name and this is custom token for morgan
});

app.listen(port,()=>{
    console.log("App started on "+ port+" Port.")
})
module.exports = app; //this is for exporting the app for testing purpose mocha/chai
