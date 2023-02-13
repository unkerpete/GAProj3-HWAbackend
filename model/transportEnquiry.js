const mongoose = require("mongoose");

const transportEnquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const TransportEnquiry = mongoose.model("TransportEnquiry", subscriptionSchema);

module.exports = TransportEnquiry;
