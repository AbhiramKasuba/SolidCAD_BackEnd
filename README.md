# SolidCAD_BE
This repo contains the BackEnd Code for the SolidCAD Customer Equiry Form Assignment


## [Tech Stack](#stack)

<!-- FEATURES:START -->
- **NoSQL database**: [MongoDB](https://www.mongodb.com/) object data modeling using [Mongoose](https://mongoosejs.com/)
- **Express** : [ExpressJs](http://expressjs.com/) framework based on nodejs
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **moment** [MomentJS](https://momentjs.com/) date manuplation library.
- **Hapi/JOI** [JOI] Library for validating the request and its parameters.
- **Cors** [cors] Cross origin resource sharing.
- **helmet** [helmet] Package for setting security measures.
- **mailgen** [Mailgen] NPM Package allows to maintain email themes.
- **mongoose** [mongoose] ODM for mongodb data defination and manuplations.
- **mongodb** [mongodb] Mongodb database driver for connecting and managing mongodb databases.
- **nodemailer** [nodemailer] NPM package for compiling and sending email with AWS-SES.
- **nodemailer-html-to-text** [nodemailer-html-to-text] NPM package compiles html objects to text.
- **aws-sdk** [aws-sdk] SDK for managing aws resources via NodeJS.
- **compression** [compression] Package gzips compress the response data.
<!-- FEATURES:END -->

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version LTS
- Install [mongodb] mongodb in your local and add it to System Environment.


# Getting started
- Clone the repository
- Install dependencies
```
cd SolidCAD_BackEnd
npm install

```
- In case, if you already have connection string of external mongodb servers like Atlas etc, You can replace the mongodbUrl with YOUR database URL value, in model/development.json file.  

-IMPORTANT: You have to update SMTP Server Details (from mailtrap.io 1.signup and create account and go to https://mailtrap.io/inboxes/) 2.click my inboxes 3. In smtp setting you have integrations section select nodemailer from drop down and then you will find smtp details) in the model/development.json,You can replace the `SMTP_USER` with YOUR `user` credentails and `SMTP_SECRET` with your `pass` found in SMTP Configuration, in model.development.json file.  

- Copy the email templates folder 'contactUS' from email_templates folder and Paste it in node_modules/mailgen/theme
```
copy from email_templates/contactUS (entire folder contactUS) -> node_modules/mailgen/themes

note: this is not command just instructions if you mis configure then may throw error and you wont receive emails
```

- Run the project
```
npm start
```
- API Document endpoints

  swagger Endpoint : http://localhost:1002/APIDoc


## [API Documentation](#api-documentation)

To view all APIs and learn all the details required for the requests and responses, run the server and go to http://localhost:1002/APIDoc in your browser. [Swagger](https://swagger.io/) automatically creates this page by using the definitions and descriptions written as comments in the required files.

### API Endpoints

List of available routes:  
  
**routes**:
- **index.js (Non-Authenticated)**

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| -------------------------------- | -------------------------------------------------------------------------------------------------|
| **controllers/customer.controllers.js**                   | Controllers define functions to serve various express routes.                                            |
| **docs/**                        | Contains the swagger.json file with api configurations                                            |
| **email_templates/**               | Contains all the email template themes.                                                          |
| **library/**           | Contains the all helper libraries.                                                       |
| **logs**       | stores the application logs in log file|
| **model**       | Models define schemas that will be used in storing and retrieving data from Application database |
| **node_modules**         | Contains all  npm dependencies                                                                   |
| **reports**         | Contains test report results html file (api.html has complete results) |
| **routes**       | Contain all express routes, separated by module/area of application                              |
| **test**       | Contain all BE Unit test scripts built in mocha and chai|
| **package.json**         | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped) | 

| **server.js**          | Entry point to express app                                                                       |


### Running the app
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script | Description  |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Runs full build and runs node on  server.js. Can be invoked with `npm run start`                   |

| `test`                   | Runs full build and runs node on  server.js and executes the unit tests. Can be invoked with `npm run test`                   |


### Testing the app

```
npm test
```

Make sure the nodejs app is not started as the test will start the app.
To view test results are saved in reports\api\api.html file


**THANK YOU!**
