const express = require("express");
const router = express.Router();
const { Club, Tag } = require("../models/Club");

router.get("/:keyword", (req, res) => {
  Club.find(
    { name: { $regex: req.params.keyword, $options: "i" } },
    (err, clubs) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, clubs });
    }
  );
});

router.get("/tag/:tag", async (req, res) => {
  console.log("search by tag");
  try {
    const tag = await Tag.findOne({ tagName: req.params.tag });
    console.log(tag);
    Club.find({ tags: tag }, (err, clubs) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, clubs });
    });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
