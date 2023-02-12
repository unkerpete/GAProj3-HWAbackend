const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: Number, required: true }, // requires frontend to verify or convert to number
    type: { type: String, required: true },
    message: { type: String, required: true },
  },
  { collection: "volunteer" }
);

const Volunteer = new mongoose.model("Volunteer", EnquirySchema);

module.exports = Volunteer;
