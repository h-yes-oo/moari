const mongoose = require('mongoose');

const storyphotoSchema = mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    }
})

const storySchema = mongoose.Schema({
    clubId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club'
    },
    content : {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    storyPhotos : [{
        type: storyphotoSchema,
        ref: "StoryPhoto"
    }]
})

const StoryPhoto = mongoose.model('StoryPhoto', storyphotoSchema); 
const Story = mongoose.model('Story', storySchema)

module.exports = { Story, StoryPhoto };

