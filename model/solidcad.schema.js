const mongoose = require('mongoose');

//contact us schema ODM
const ContactsSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String,
    },
    email:{
        type:String
    },
    message:{
        type:String
    },
    supportId:{
        type:String
    }
});

ContactsSchema.set('timestamps',true);

mongoose.model('ContactsSchema', ContactsSchema, 'contactEnquires');
//Exporting the scope to other files.
module.exports = {
    ContactsSchema:ContactsSchema
}
