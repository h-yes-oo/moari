const express = require('express');
const router = express.Router();
const { clubSchema, Club, Image } = require("../models/Club");
const { User } = require("../models/User");

// use for image upload
const fs = require('fs'); 
const path = require('path'); 
const multer = require('multer');
  
const upload_club = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname+'/uploads/clubs'));
    },
    filename: function (req, file, cb) {
        // extname: 확장자(.png, .jpg, .jpeg...)
        cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  }),
});

// router.use(function(req, res, next) {
//   console.log('clubs router');
//   next();
// });

router.get('/', async (req, res) => {
  console.log('clubs index');
  try {
    const clubs = await Club.find();
    // clubs.map(club => {
    //     console.log(club.photos);
    // })

    res.json(clubs);
    // res.send(clubs);    
  } catch (err) {
    res.json({ message: err });
  }
});

// single - single file
// array - multiple files
router.post('/', upload_club.array('photos'), async (req, res) => {
    const club = new Club({
        name: req.body.name,
        school: req.body.school,
        description: req.body.description,
        category: req.body.category,
        tags: req.body.tags,
        status: req.body.status        
    });

    // console.log(req.files);
    for (let image of req.files) {
        let obj = {
            img: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/clubs/' + image.filename)),
                contentType: 'image/png' 
            },
            club: club
        }

        const newImage = new Image(obj);
        newImage.save();
        club.photos.push(newImage);
    }
    try {
        const newClub = await club.save();
        res.json(newClub);
    } catch(err) {
        res.json({ message: err });
    }
});

router.get('/:clubId', async (req, res) => {
    try {
        const club = await Club.findById(req.params.clubId);
        res.json(club);
    } catch(err) {
        res.json({ message: err });
    }
});

router.delete('/:clubId', async (req, res) => {
    try {
        const removedClub = await Club.remove({ _id: req.params.clubId }); 
        res.json(removedClub);
    } catch(err) {
        res.json({ message: err });
    }
})

router.patch('/:clubId', async (req, res) => {
    try {
        const updatedClub = await Club.updateOne(
            { _id: req.params.clubId },
            { $set: req.body }
        );
        res.json(updatedClub);
    } catch(err) {
        res.json({ message: err });
    }
})

router.post('/:clubId/like/:userId', async (req, res) => {
    try {
        const club = await Club.findById(req.params.clubId);
        const user = await User.findById(req.params.userId);
        if (user.likedClubs.some(cid => cid.toString() === club.id)) {
            console.log('already exists...')
            user.likedClubs = user.likedClubs.filter(cid => cid.toString() !== club.id);
            club.likedUsers = club.likedUsers.filter(uid => uid.toString() !== user._id.toString());
        } else {
            console.log('new like!')
            user.likedClubs.push(club);
            club.likedUsers.push(user);
        }
        user.save();
        club.save();

        res.json({ user: user, club: club });
    } catch(err) {
        res.json({ message: err });
    }
})

router.get('/info', function(req, res) {
  res.send('clubs info');
});


module.exports = router; 