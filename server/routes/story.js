const express = require('express');
const router = express.Router();
const { Story, StoryPhoto } = require("../models/Story");

const fs = require("fs");
const path = require("path");
const multer = require("multer");

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
    console.log(req.params.clubId);
    Story.find({'clubId' : req.params.clubId}, (err, stories) => {
        if(err) return res.json({ success: false, err })
        res.status(200).json({ success: true, stories });
    })
})

let fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpeg' && ext !== '.jpg') {
        return cb(new Error('png, jpeg 형식만 가능합니다'), false);
    }
    cb(null, true)
}

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname + "/uploads/story"));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
})

const uploadStory = multer({ storage, fileFilter });

router.post('/saveStory', uploadStory.array("photos"), async (req, res) => {
    console.log(req.body);
    const story = await new Story({
        ...req.body,
        date: getKoreanDate()
    })
    for (const file of req.files) {
        let image = {
          img: {
            data: fs.readFileSync(
              path.join(__dirname + "/uploads/story/" + file.filename)
            ),
            contentType: "image/png",
          },
        };
    
        const newImage = new StoryPhoto(image);
        newImage.save();
        story.storyPhotos.push(newImage);
    }
    story.save((err, story) => {
        if(err) return res.json({ success: false, err })
        res.status(200).json({ success: true, story });
    })
});

router.delete('/deleteStory/:storyId', (req, res) => {
    console.log('here')
    Story.findByIdAndDelete(req.params.storyId, (err, result) => {
        if(err) return res.json({ success: false, err })
        res.status(200).json({ success: true });
    })
})

module.exports = router;