const mongoose = require("mongoose");

const TransportSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: Number, required: true }, // requires frontend to verify or convert to number
    type: { type: String, required: true },
    message: { type: String, required: true },
  },
  { collection: "transport" }
);

const Transport = new mongoose.model("Transport", EnquirySchema);

module.exports = Transport;
