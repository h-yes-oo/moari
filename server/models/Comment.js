const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    clubId: {
        type: Schema.Types.ObjectId,
        ref: 'Club'
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    content: {
        type: String
    },
    createdDate : {
        type: String
    }
})


const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }