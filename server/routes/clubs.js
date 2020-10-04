const express = require('express');
const router = express.Router();
const { Club, Image } = require("../models/Club");

// use for image upload
const fs = require('fs'); 
const path = require('path'); 
const multer = require('multer');

const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'assets/uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now())
        // You could use the original name
        // cb(null, file.originalname)
    } 
}); 
  
const upload = multer({ storage: storage }); 

// middleware that is specific to this router
router.use(function(req, res, next) {
  console.log('clubs router');
  next();
});

router.get('/', async (req, res) => {
  console.log('clubs index');
  try {
    const clubs = await Club.find();
    // clubs.populate('photos').exec().then((clubs) => {
    //     clubs.forEach((club) => {
    //         club.photos.forEach((photo) => {
    //             console.log({ club, photo });
    //         });
    //     });
    // });

    res.json(clubs);
  } catch(err) {
    res.json({ message: err });
  }

    // imgModel.find({}, (err, items) => { 
    //     if (err) { 
    //         console.log(err); 
    //     } 
    //     else { 
    //         res.json({ items: items }); 
    //     } 
    // }); 
});

// Retriving the image 
// app.get('/', (req, res) => { 
//     imgModel.find({}, (err, items) => { 
//         if (err) { 
//             console.log(err); 
//         } 
//         else { 
//             res.json({ items: items }); 
//         } 
//     }); 
// });

router.post('/', async (req, res) => {
    console.log(req.body);
    const club = new Club(req.body);
    const image = new Image(req.body.image);

    try {
        const newClub = await club.save();
        newClub.photos.push(image);
        res.json(newClub);
    } catch(err) {
        res.json({ message: err });
    }
    // club.save()
    //     .then(data => {
    //         res.json(data);
    //     })
    //     .catch(err => {
    //         res.json({ message: err });
    //     });
})

// // add1
router.post('/', upload.single('image'), (req, res, next) => { 
    console.log(req.file);

    var obj = { 
        img: { 
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
            contentType: 'image/png'
        } 
    } 

    Image.create(obj, (err, item) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            // item.save(); 
            res.redirect('/'); 
        } 
    }); 
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

router.get('/info', function(req, res) {
  res.send('clubs info');
});

module.exports = router; 