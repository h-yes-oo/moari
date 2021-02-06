const express = require('express');
const router = express.Router();
const { Story } = require("../models/Story");

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

router.get('/getStories/:clubId', (req, res) => {
    Story.find({'clubId' : req.params.clubId}, (err, stories) => {
        if(err) return res.json({ success: false, err })
        res.status(200).json({ success: true, stories });
    })
})

router.post('/saveStory', (req, res) => {
    console.log('in the save function')
    const story = new Story({
        ...req.body,
        date: getKoreanDate()
    })
    story.save((err, story) => {
        if(err) return res.json({ success: false, err })
        res.status(200).json({ success: true, story });
    })
});

module.exports = router;