const mongoose = require("mongoose");

const SubsSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true }, // requires frontend to verify if valid email format
  },
  { collection: "subscriptions" }
);

const Subs = mongoose.models("Subs", SubsSchema);

module.exports = Subs;
