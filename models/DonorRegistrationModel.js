const mongoose = require("mongoose");

// Prevent OverwriteModelError
const DonorFormSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    age: { type: Number, required: true },
    city: { type: String, required: true },
  },
  { timestamps: true }
);

// IMPORTANT: 3rd parameter forces collection name
module.exports = mongoose.models.DonorRegistration ||
  mongoose.model("DonorRegistration", DonorFormSchema, "donorRegistration");
