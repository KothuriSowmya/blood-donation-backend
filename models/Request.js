const express = require('express');
const mongoose = require("mongoose");

const requestSchema = mongoose.Schema(
  {
    recipientName: String,
    hospitalName: String,
    bloodGroup: String,
    units: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
