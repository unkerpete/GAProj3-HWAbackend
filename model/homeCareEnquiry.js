const mongoose = require("mongoose");

const homeCareEnquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const HomeCareEnquiry = mongoose.model("HomeCareEnquiry", subscriptionSchema);

module.exports = HomeCareEnquiry;
