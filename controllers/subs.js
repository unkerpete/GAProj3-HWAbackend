// import schema from models
const Subs = require("../models/subs");

// Function to create a subscription PUT method
const createSubscription = async (req, res, next) => {
  try {
    // check if user has subscribed before and throw an error to frontend indicating user had subbed before
    const checkSub = await Subs.findOne({ email: req.body.email });

    if (checkSub) {
      return res.status(400).json({
        status: "error",
        message: "user has subscribed before",
      });
    }

    const newSub = await Subs.create({
      email: req.body.email,
    });

    // return to frontend with success response
    res.json({
      status: "success",
      message: "user has been added to subscription list",
      newsub: newSub,
    });
  } catch (err) {
    console.log("PUT /subs/create ", err);
    res.status(400).json({ status: "error", message: err.message });
  }
};

// 3. Function to get all subscriptions, sorted by latest first. GET method
const showSubscriptions = async (req, res) => {
  try {
    const allSubsResults = await Subs.find().sort({ createdAt: -1 });
    res.json(allSubsResults);
  } catch (err) {
    console.log("GET /subs/showall ", err);
    res.status(400).json({ status: "error", message: err.message });
  }
};

// To export the functions to router
module.exports = { createSubscription, showSubscriptions };
