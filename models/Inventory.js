const express = require('express');
const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema(
  {
    bloodGroup: String,
    units: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("inventory", inventorySchema);
