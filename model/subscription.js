const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const Subscribers = mongoose.model("Subscribers", subscriptionSchema);

module.exports = Subscribers;
