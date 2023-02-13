const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  { collection: "image" }
);

const imageModel = new mongoose.model("imageModel", ImageSchema);

module.exports = imageModel;
