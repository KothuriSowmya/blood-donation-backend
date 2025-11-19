const express = require('express');
const Donor = require("../models/Donor");

//
// @desc    Register a new donor
// @route   POST /api/donors
// @access  Private (Requires token)
//
exports.createDonor = async (req, res) => {
  const { name, email, phone, bloodType, city, age, gender } = req.body;

  try {
    // Check if user already exists (email or phone unique)
    const existingDonor = await Donor.findOne({ $or: [{ email }, { phone }] });
    if (existingDonor) {
      return res.status(400).json({ msg: "User with this email/phone already exists" });
    }

    const donor = new Donor({
      name,
      email,
      phone,
      bloodType,
      city,
      age,
      gender
    });

    const newDonor = await donor.save();
    res.status(201).json(newDonor);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//
// @desc    Get all donors
// @route   GET /api/donors
// @access  Private (Admin / Staff / Authorized Users)
//
exports.getDonors = async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    res.json(donors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//
// @desc    Get logged-in user's donor profile
// @route   GET /api/donors/me
// @access  Private
//
exports.getMyDonorProfile = async (req, res) => {
  try {
    const donor = await Donor.findOne({ email: req.user.email });

    if (!donor) {
      return res.status(404).json({ msg: "Donor profile not found" });
    }

    res.json(donor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//
// @desc    Get donor by ID
// @route   GET /api/donors/:id
// @access  Private
//
exports.getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({ msg: "Donor not found" });
    }

    res.json(donor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//
// @desc    Update donor details
// @route   PUT /api/donors/:id
// @access  Private
//
exports.updateDonor = async (req, res) => {
  try {
    const updatedDonor = await Donor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedDonor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//
// @desc    Delete donor
// @route   DELETE /api/donors/:id
// @access  Private (Admin)
//
exports.deleteDonor = async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);
    res.json({ msg: "Donor deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
