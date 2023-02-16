const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: Number, required: true }, // requires frontend to verify or convert to number
    selection: { type: String },
    message: { type: String, required: true },
  },
  { collection: "contact", timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
