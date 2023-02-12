const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: Number, required: true }, // requires frontend to verify or convert to number
    type: { type: String, required: true },
    message: { type: String, required: true },
  },
  { collection: "contact" }
);

const Contact = new mongoose.models("Contact", ContactSchema);

module.exports = Contact;
