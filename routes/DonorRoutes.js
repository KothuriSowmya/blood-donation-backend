// routes/donorRoutes.js
const express = require("express");
const router = express.Router();

const {
  createDonor,
  getDonors,
  getDonorById,
  updateDonor,
  deleteDonor
} = require("../controllers/DonorController");

const { protect } = require("../middleware/authMiddleware");

/**
 * @route   POST /api/donors
 * @desc    Register/Add a new donor
 * @access  Protected (requires token)
 */
router.post("/", protect, createDonor);

/**
 * @route   GET /api/donors
 * @desc    Get all donors
 * @access  Protected (requires token)
 */
router.get("/", protect, getDonors);

/**
 * @route   GET /api/donors/:id
 * @desc    Get a donor by ID
 * @access  Protected (requires token)
 */
router.get("/:id", protect, getDonorById);

/**
 * @route   PUT /api/donors/:id
 * @desc    Update donor details
 * @access  Protected (requires token)
 */
router.put("/:id", protect, updateDonor);

/**
 * @route   DELETE /api/donors/:id
 * @desc    Delete donor
 * @access  Protected (requires token)
 */
router.delete("/:id", protect, deleteDonor);

module.exports = router;
