const express = require('express');
const router = express.Router();
// const { User } = require("../models/User");
// const { Club } = require("../models/Club");
const { Comment } = require("../models/Comment");

function getKoreanDate(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    const currentDate = new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
    return currentDate.toISOString().slice(0,10);
}

router.post('/saveComment',(req,res)=>{
    const variables = {
        ...req.body,
        createdDate: getKoreanDate()
    }
    const comment = new Comment(variables);
    comment.save((err, comment) => {
        if(err) return res.json({ success: false, err })
        Comment.findById(comment._id)
                .populate('writer')
                .exec((err, result) => {
                    if(err) return res.json({ success: false, err });
                    res.status(200).json({ success: true, comment: result });
                });
    });
});

router.get('/getComments/:clubId', (req,res) => {
    Comment.find({'clubId': req.params.clubId })
    .populate('writer')
    .exec((err, comments) => {
        if(err) return res.json({ success: false, err });
        res.status(200).json({ success: true, comments })
    })
})

router.delete('/deleteComment/:commentId', (req,res) => {
    Comment.findById(req.params.commentId,(err, comment) => {
        if(err) return res.status(400).json({ success: false, err})
        if(!comment.responseTo){
            Comment.deleteMany({ responseTo: comment._id }, (err, result) => {
                if(err) return res.status(400).json({ success: false, err})
            })
        }
        Comment.findByIdAndRemove(comment._id, (err, comment) => {
            console.log(comment);
            if(err) return res.status(400).json({ success: false, err})
            res.status(200).json({ success: true , comment})
        })
    })
})

router.get('/searchComment/:clubId/:keyword', (req,res) => {
    Comment.find({ 
        clubId: req.params.clubId, 
        content: { $regex: req.params.keyword, $options: 'i' }
    }, (err, comments) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, comments });
    })
})

module.exports = router;