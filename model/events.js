const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: Buffer, required: false },
  },
  { timestamps: true }
);

const Events = mongoose.model("Events", eventsSchema);

module.exports = Events;
