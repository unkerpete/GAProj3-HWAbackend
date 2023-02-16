const mongoose = require("mongoose");

const homeCareEnquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    selection: { type: String },
    message: { type: String, required: true },
  },
  { collection: "home", timestamps: true }
);

const HomeCareEnquiry = mongoose.model(
  "HomeCareEnquiry",
  homeCareEnquirySchema
);

module.exports = HomeCareEnquiry;
