const express = require('express');
const router = express.Router();
const { Club } = require("../models/Club");

router.get('/:keyword', (req, res) => {
    Club.find({ name: { $regex: req.params.keyword, $options: 'i' } }, (err, clubs) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, clubs });
    });
});

module.exports = router;