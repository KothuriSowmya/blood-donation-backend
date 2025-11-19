// routes/inventoryRoutes.js
const express = require("express");
const router = express.Router();

const {
  createInventory,
  getInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
} = require("../controllers/InventoryController");

const { protect } = require("../middleware/authMiddleware");

/**
 * @route   POST /api/inventory
 * @desc    Add blood units to inventory (Add inventory record)
 * @access  Protected (requires token)
 */
router.post("/", protect, createInventory);

/**
 * @route   GET /api/inventory
 * @desc    Get all inventory records
 * @access  Protected (requires token)
 */
router.get("/", protect, getInventory);

/**
 * @route   GET /api/inventory/:id
 * @desc    Get specific inventory record by ID
 * @access  Protected (requires token)
 */
router.get("/:id", protect, getInventoryById);

/**
 * @route   PUT /api/inventory/:id
 * @desc    Update existing inventory record
 * @access  Protected (requires token)
 */
router.put("/:id", protect, updateInventory);

/**
 * @route   DELETE /api/inventory/:id
 * @desc    Remove inventory record from database
 * @access  Protected (requires token)
 */
router.delete("/:id", protect, deleteInventory);

module.exports = router;
