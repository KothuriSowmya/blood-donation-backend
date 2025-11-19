const express = require('express');
const Inventory = require("../models/inventory");

//
// @desc    Add blood stock to inventory
// @route   POST /api/inventory
// @access  Private (requires token)
//
exports.createInventory = async (req, res) => {
  const { bloodGroup, units } = req.body;

  try {
    if (!bloodGroup || !units) {
      return res.status(400).json({ msg: "Please provide bloodGroup and units" });
    }

    const stock = new Inventory({
      bloodGroup,
      units,
    });

    const savedStock = await stock.save();
    res.status(201).json(savedStock);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//
// @desc    Get all blood stock from inventory
// @route   GET /api/inventory
// @access  Private
//
exports.getInventory = async (req, res) => {
  try {
    const stock = await Inventory.find().sort({ createdAt: -1 });
    res.json(stock);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//
// @desc    Get inventory record by ID
// @route   GET /api/inventory/:id
// @access  Private
//
exports.getInventoryById = async (req, res) => {
  try {
    const stock = await Inventory.findById(req.params.id);

    if (!stock) {
      return res.status(404).json({ msg: "Inventory record not found" });
    }

    res.json(stock);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//
// @desc    Update inventory units (increase or decrease)
// @route   PUT /api/inventory/:id
// @access  Private
//
exports.updateInventory = async (req, res) => {
  try {
    const updatedStock = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedStock);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//
// @desc    Delete inventory entry
// @route   DELETE /api/inventory/:id
// @access  Private
//
exports.deleteInventory = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ msg: "Inventory record deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
