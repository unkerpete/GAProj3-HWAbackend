const mongoose = require("mongoose");

const contactUsEnquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    enquiryType: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const ContactUsEnquiry = mongoose.model(
  "ContactUsEnquiry",
  contactUsEnquirySchema
);

module.exports = ContactUsEnquiry;
