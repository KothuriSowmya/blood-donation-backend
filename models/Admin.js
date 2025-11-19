const express = require('express');
const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
