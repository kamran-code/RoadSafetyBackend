const express = require("express");
const Accident = require("../Models/accidents");
const router = express.Router();

router.post("/report", async (req, res) => {
  const { description, location } = req.body;
  try {
    // Check if a similar record exists
    const existingAccident = await Accident.findOne({ description, location });

    if (existingAccident) {
      return res.status(400).json({
        message: "Accident data already exists.",
      });
    }

    // Save the new accident report if no duplicates
    const newAccident = new Accident({
      description,
      location,
    });

    await newAccident.save();
    res.status(201).json({
      message: "Accident Reported Successfully",
    });
  } catch (error) {
    console.error("Error while saving accident:", error);
    res.status(500).json({
      message: "Error Reporting Accident",
    });
  }
});
router.get("/accidents", async (req, res) => {
  try {
    const Accidents = await Accident.find();

    return res.status(200).json({
      Accidents,
    });
  } catch (error) {
    res.status(500).json({
      message: "No Accidents",
    });
  }
});

module.exports = router;
