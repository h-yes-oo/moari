const mongoose = require("mongoose");

const recruitSchema = mongoose.Schema({
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
  },
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  contact: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Recruit = mongoose.model("Recruit", recruitSchema);
module.exports = {
  Recruit,
};
