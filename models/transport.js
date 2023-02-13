const mongoose = require("mongoose");

const TransportSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: Number, required: true }, // requires frontend to verify or convert to number
    selection: { type: String },
    message: { type: String, required: true },
  },
  { collection: "transport", timestamps: true }
);

const Transport = new mongoose.model("Transport", TransportSchema);

module.exports = Transport;
