const express = require('express');
const router = express.Router();
const Club = require('../models/Club');

// middleware that is specific to this router
router.use(function(req, res, next) {
  console.log('clubs router');
  next();
});

router.get('/', async (req, res) => {
  console.log('clubs index');
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch(err) {
    res.json({ message: err });
  }
});
 
router.post('/', async (req, res) => {
    console.log(req.body);
    const club = new Club(req.body);
    try {
        const newClub = await club.save();
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