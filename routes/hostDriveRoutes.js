const express = require("express");
const router = express.Router();
const HostDrive = require("../models/HostDriveModel");

// ✅ Submit drive request
router.post("/create", async (req, res) => {
  try {
    const newDrive = new HostDrive(req.body);
    await newDrive.save();
    res.status(201).json({ msg: "Drive Request Submitted Successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

// ✅ Get all drives
router.get("/", async (req, res) => {
  try {
    const drives = await HostDrive.find();
    res.json(drives);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
