const mongoose = require("mongoose");

const volunteerEnquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    companyName: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const VolunteerEnquiry = mongoose.model(
  "VolunteerEnquiry",
  volunteerEnquirySchema
);

module.exports = VolunteerEnquiry;
