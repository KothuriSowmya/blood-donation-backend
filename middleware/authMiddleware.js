const express = require('express');
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token, unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.log("Auth Error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { protect };
