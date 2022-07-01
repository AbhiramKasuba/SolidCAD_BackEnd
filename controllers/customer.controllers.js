const Joi = require('joi');
const mongoose = require('mongoose');
const contactSchema = mongoose.model('ContactsSchema');

const { 
    contactUs,
    sendMail
} = require('../library/helper');

const logger=require('../library/logger')
//const { ContactsSchema } = require('../model/solidcad.schema');


/**
 * @function contactUs // Accepts paylod for customer enquiry
 * @param {*} req 
 * @param {*} res 
 * @method POST
 * @body {firstName,lastName,email and message}
 * @returns Success-> http status:201,success:true and success message, Fails=> http status:200,success:false and failed message 
 */
module.exports.contactUs = async (req, res) => {
    try {
        console.log("body", req.body);
        const payload = Joi.object().keys({
            firstName: Joi.string().max(25).required(),
            lastName: Joi.string().max(25).required(),
            email: Joi.string().email().max(50).required(),
            message: Joi.string().max(500).required()
        })

        let { error, value } = payload.validate(req.body);
        if (error) {
            logger.error(error);
            return res.status(200).send({ success: false, message: error.details[0].message });
        }
        if (value) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            value.supportId = "Solid-Case-" + uniqueSuffix;
            contactSchema.create(value, function (error, enquiryDetailSaved) {
                if (error) {
                    logger.error(err);
                    console.log("Unable to create Contact Form");
                    res.status(200).json({ success: false, message: "Unable to Create Enquiry Form!!Contact SolidCAD Team!" })
                }
                else if (!enquiryDetailSaved) {
                    logger.error("Unable t0 create Contact Form");
                    console.log("Unable to create Contact Form");
                    res.status(200).json({ success: false, message: "Unable to Create Enquiry Form!!Contact SolidCAD Team!" })

                }
                else {
                    let email = contactUs({ 'firstName': enquiryDetailSaved.firstName, 'supportId': enquiryDetailSaved.supportId });
                    email.then((compiledTemplate) => {
                        sendMail(enquiryDetailSaved.email, 'Re:SolidCAD Enquiry Case ID:' + enquiryDetailSaved.supportId, compiledTemplate, [])
                            .then((emailSent) => {
                                logger.info("Successfully Created Enquiry and Send Email");
                                   
                                if (emailSent) {
                                    return res.status(201).send({ success: true, message: 'Thanks you for reaching SolidCad Team!!We will get back to you asap!!' })
                                } else {
                                    return res.status(200).send({ success: true, message: 'Unable to create your Ticket Contact SolidCAD on 1.877.438.2231' })
                                }
                            })
                    })
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Internal server error.' })
    }
}