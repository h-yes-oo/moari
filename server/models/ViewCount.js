const mongoose = require('mongoose');

//현재는 

const viewCountSchema = mongoose.Schema({
    clubId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club'
    },
    ip : {
        type: String,
        required: true
    }
}, {timestamps: { createdAt: 'firstVisitAt', updatedAt: 'lastVisitAt'}})

const ViewCount = mongoose.model('ViewCount', viewCountSchema)
module.exports = { ViewCount };

