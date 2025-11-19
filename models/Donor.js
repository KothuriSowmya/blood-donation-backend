const mongoose = require("mongoose");

const donorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^.+@.+\..+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      match: [/^\+?\d{10,15}$/, "Invalid phone number"],
    },
    bloodType: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], // ✅ restricts only valid types
    },
    city: {
      type: String,
      required: true,
    },

    // Optional recommended fields
    age: {
      type: Number,
      min: [18, "Minimum age is 18"],
      max: [65, "Maximum age is 65"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donor", donorSchema);
