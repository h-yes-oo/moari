const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({ 
    // name: String, 
    // desc: String, 
    // img: { 
    //     data: Buffer, 
    //     contentType: String 
    // } 
    img: {
        data: Buffer,
        contentType: String
    },
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club",
    }
}); 

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
    photos: [imageSchema],
    // photos : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]

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

const Image = mongoose.model('Image', imageSchema); 
const Club = mongoose.model('Club', clubSchema)
module.exports = {
    Club, 
    Image
};

