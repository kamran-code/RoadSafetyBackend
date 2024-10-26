const mongoose = require("mongoose");

const accidentSchema = new mongoose.Schema({
  description: String,
  location: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Accident", accidentSchema);
