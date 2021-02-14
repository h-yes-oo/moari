const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({ 
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
    },
    photos: [{
        type: imageSchema,
        ref: "Image"
    }],
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
    },
    status: {
        type: String,
        required: true,
    },
    likedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    views: {
        type: Number,
        default: 0
    }
    // managers: [{
    //     type: userSchema,
    //     ref: "User"
    // }],
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

