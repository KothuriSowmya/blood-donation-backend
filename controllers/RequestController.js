const express = require('express');
const Request = require("../models/Request");

// --------------------------------------------------------
// @desc    Create a blood request
// @route   POST /api/requests
// @access  Private
// --------------------------------------------------------
const createRequest = async (req, res) => {
  try {
    const { recipientName, hospitalName, bloodGroup, units } = req.body;

    if (!recipientName || !hospitalName || !bloodGroup || !units) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const newRequest = await Request.create(req.body);
    res.status(201).json(newRequest);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// --------------------------------------------------------
// @desc    Get all requests
// @route   GET /api/requests
// @access  Private
// --------------------------------------------------------
const getRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// --------------------------------------------------------
// @desc    Get request by ID
// @route   GET /api/requests/:id
// @access  Private
// --------------------------------------------------------
const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request)
      return res.status(404).json({ msg: "Request not found" });

    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// --------------------------------------------------------
// @desc    Update a request
// @route   PUT /api/requests/:id
// @access  Private
// --------------------------------------------------------
const updateRequest = async (req, res) => {
  try {
    const updated = await Request.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// --------------------------------------------------------
// @desc    Delete a request
// @route   DELETE /api/requests/:id
// @access  Private
// --------------------------------------------------------
const deleteRequest = async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.json({ msg: "Request deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
};
