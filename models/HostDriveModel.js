const mongoose = require("mongoose");

const HostDriveSchema = new mongoose.Schema(
  {
    organizerName: {
      type: String,
      required: true,
    },
    contactPerson: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    driveTitle: {
      type: String,
      required: true,
    },
    date: {
      type: String, // or Date, if needed
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    expectedDonors: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("HostDrive", HostDriveSchema);
