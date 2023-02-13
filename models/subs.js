const mongoose = require("mongoose");

const SubsSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true }, // requires frontend to verify if valid email format
  },
  { collection: "subscriptions", timestamps: true }
);

const Subs = mongoose.model("Subs", SubsSchema);

module.exports = Subs;
