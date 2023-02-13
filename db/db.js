const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("DB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // force exit for user if cannot connect to database
  }
};

module.exports = connectDB;
