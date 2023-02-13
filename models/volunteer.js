const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: Number, required: true }, // requires frontend to verify or convert to number
    company: { type: String, required: true },
    message: { type: String, required: true },
  },
  { collection: "volunteer", timestamps: true }
);

const Volunteer = new mongoose.model("Volunteer", VolunteerSchema);

module.exports = Volunteer;
