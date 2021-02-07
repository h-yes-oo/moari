const express = require('express');
const router = express.Router();
const { clubSchema, Club, Image } = require("../models/Club");
const { ViewCount } = require("../models/ViewCount");
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
    Club.find()
    .exec((err, clubs) => {
        if(err) return res.status(400).json({ success: false, err});
        res.status(200).json({ success: true, clubs });
    }) 

  //console.log('clubs index');
//   try {
//     const clubs = await Club.find();
//     // clubs.map(club => {
//     //     console.log(club.photos);
//     // })

//     res.json(clubs);
//     // res.send(clubs);    
//   } catch (err) {
//     res.json({ message: err });
//   }

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
    club.save((err, club) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true,
            club
        })
    })
});

router.get('/:clubId', async (req, res) => {
    Club.findById(req.params.clubId, (err, club) => {
        if(err) return res.status(400).json({ success: false, err});
    //     const viewCount = new ViewCount({
    //         clubId: req.params.clubId,
    //         ip: req.ip
    //     })
    //     viewCount.save((err, viewCount)=> {
    //         if(err) return res.status(400).json({ success: false, err});
    //         res.status(200).json({ success: true, club})
    //     });

        if(!club) return res.status(200).json({ success: true });
        try{
            const oneDay = 24 * 60 * 60 * 1000;
            if(req.cookies["viewedPages"]){
                const viewedPagesCookie = req.cookies["viewedPages"];
                const viewedPages = JSON.parse(viewedPagesCookie);
                const index = viewedPages.indexOf(`${club._id}`);
                if(index === -1){
                    console.log('viewed for the first time !')
                    const expiryDate = new Date(Date.now() + oneDay);
                    viewedPages.push(club._id);
                    viewedPages.push(expiryDate);
                    res.cookie("viewedPages", JSON.stringify(viewedPages), { expires: expiryDate });
                    Club.findByIdAndUpdate(club._id, { $inc: {views: 1}}, {new: true},(err, updated) => {
                        if(err) return res.status(400).json({ success: false, err});
                        return res.status(200).json({ success: true, club: updated})
                    
                    })
                } else {
                    if(Date.parse(viewedPages[index+1]) < Date.now() ){
                        console.log('viewed before one day !')
                        viewedPages.splice(index,2);
                        const expiryDate = new Date(Date.now() + oneDay);
                        viewedPages.push(club._id);
                        viewedPages.push(expiryDate);
                        res.cookie("viewedPages", JSON.stringify(viewedPages), { expires: expiryDate });
                        Club.findByIdAndUpdate(club._id, { $inc: {views: 1}}, {new: true},(err, updated) => {
                            if(err) return res.status(400).json({ success: false, err});
                            return res.status(200).json({ success: true, club: updated})
                        })
                    } else {
                        console.log('viewed in one day !')
                        return res.status(200).json({ success: true, club})
                    }
                }
            } else {
                console.log('viewed for the first time !')
                const expiryDate = new Date(Date.now() + oneDay);
                const viewedPages = [ club._id , expiryDate ];
                const viewedPagesJsonStr = JSON.stringify(viewedPages);
                res.cookie("viewedPages", viewedPagesJsonStr, { expires: expiryDate });
                Club.findByIdAndUpdate(club._id, { $inc: {views: 1}}, {new: true},(err, updated) => {
                    if(err) return res.status(400).json({ success: false, err});
                    return res.status(200).json({ success: true, club: updated})
                })
            }
        } catch(e){
            //Todo
            console.log(e);
            return res.status(200).json({ success: true, club})
        }
    })
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

        res.status(200).json({ success: true });
    } catch(err) {
        res.status(400).json({ success: false, err });
    }
})

router.get('/info', function(req, res) {
  res.send('clubs info');
});


module.exports = router;