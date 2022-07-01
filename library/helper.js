const nodemailer = require('nodemailer');
var htmlToText = require('nodemailer-html-to-text').htmlToText;

var Mailgen = require('mailgen');

var config;
if (process.argv[2] == 'live') {
    config = require('../model/production.json');
} else if (process.argv[2] == 'testing') {
    config = require('../model/testing.json');
} else {
    config = require('../model/development.json');
}

//This Function is for sending email from nodemailer and using aws ses
const sendEmail = async(email,subject,body,files)=>{
    console.log("config",config)
    return new Promise((resolve, reject) => {
        // if (process.env.sendMail == "true") {
            console.log("Im sending email");
            let transporter = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: config.SMTP_USER,
                  pass: config.SMTP_SECRET
                }
              });

            var Mail_list = email;
            let HelperOptions = {
                from: '"no-reply" <from@mailtrap.io>',
                to: Mail_list,
                subject: subject,
                html: body,
                attachments: files
            };
            transporter.use('compile', htmlToText(HelperOptions));

            transporter.sendMail(HelperOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return reject({ success: false, message: error });
                } else {
                    console.log("The message was sent!");
                    console.log(info);
                    return resolve({ success: true, message: info });
                }

            });
    
    }).catch(err => {
        console.log(err);
    })
 }


//this function is for generating the email template paramters.
exports.contactUs = async(params)=>{
    var mailGenerator = new Mailgen({
        theme: 'contactUs',
        product: {
            name: 'SolidCAD',
            link: 'https://mailgen.js/',
            logo: 'https://www.solidcad.ca/wp-content/themes/solidcad/img/solidcad.png',
        }
    });
    var email = {
        body: {
            name: params.firstName,
            intro: 'You have received this email because a support request has been raise successfully!! SolidCAD Team will be assit you shortly.Your caseID:'+params.supportId,
            link: 'https://www.solidcad.ca/contact/',
            outro: 'If you did not request a support request, no further action is required on your part.'
        }
    };
    var emailBody = mailGenerator.generate(email);
    return emailBody;
}

 exports.sendMail = sendEmail;
