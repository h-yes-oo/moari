const mongoose = require('mongoose');

const clubSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    school: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    // photo: {
    //     type: String, 
    // },
    // field: {
    //     type: String[],
    // },
    // tags: {
    //     type: String[],
    // },
    // owner: {
    //     type: User,
    //     required: true,
    // },
    // status: {
    //     type: string,
    //     required: true,
    // },
    // useCertificate: {
    //     type: Boolean,
    // },
    // alumni: {
    //     type: User[],
    // },
})  

// add gender ratio?

const Club = mongoose.model('Club', clubSchema)
module.exports = Club;