const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    name: String,
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  { collection: "image" }
);

module.exports = ImageModel = mongoose.model("imageModel", imageSchema);
