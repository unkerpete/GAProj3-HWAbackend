const mongoose = require("mongoose");

const EventsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    dateEnd: { type: Date },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    description: { type: Date, required: true },
    img: { type: String }, // TODO: modify to binary format
    action: { type: String },
    tag: { type: String },
  },
  { collection: "events" }
);

const Events = mongoose.model("Events", EventsSchema);

module.exports = Events;
