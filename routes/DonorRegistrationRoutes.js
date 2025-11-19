const express = require("express");
const router = express.Router();
const DonorRegistration = require("../models/DonorRegistrationModel");

// REGISTER DONOR
router.post("/register", async (req, res) => {
  try {
    const donor = new DonorRegistration(req.body);
    await donor.save();
    res.status(201).json({ msg: "Donor Registered Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// GET ALL DONORS
router.get("/", async (req, res) => {
  try {
    const donors = await DonorRegistration.find();
    res.json(donors);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
