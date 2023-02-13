// import schema from models
const Subs = require("../models/subs");
// TODO: create a seed for events

// 1. Function for seeding

// 2. Function for creating subs
// expect PUT method
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
    });
  } catch (err) {
    console.log("PUT /subs/create ", err);
    res.status(400).json({ status: "error", message: err.message });
  }
};

// 3. Function for reading all

// 4. Function for updating events

// 5. Function for deleting (one event at a time) i.e. unsubscribe
// const unsubscribe = async (req, res) => {
//   try {
//     // expect unsub email to be provided
//   } catch {}
// };

// To export the functions to router
module.exports = { createSubscription };
