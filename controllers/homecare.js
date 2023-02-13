// import schema from models
const HomeCareEnquiry = require("../models/home");

// Function to create new transport enquiry. PUT method.
const createHomeCareEnquiry = async (req, res) => {
  try {
    const newHomeCareEnq = await HomeCareEnquiry.create({
      fullName: req.body.fullName,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      service: req.body.service,
      message: req.body.message,
    });
    // return to frontend with success response
    res.json({
      status: "success",
      message: "homecare enquiry submitted",
    });
  } catch (err) {
    console.log("PUT /homecare/create ", err);
    res.status(400).json({ status: "error", message: err.message });
  }
};

// Function to get all submitted transport enquiries. Sorted by latest first. GET method
const showAllHomeCareEnquiry = async (req, res) => {
  try {
    const allHomeCareResults = await HomeCareEnquiry.find().sort({
      createdAt: -1,
    });
    res.json(allHomeCareResults);
  } catch (err) {
    console.log("GET /homecare/showall ", err);
    res.status(400).json({ status: "error", message: err.message });
  }
};

// To export the functions to router
module.exports = { createHomeCareEnquiry, showAllHomeCareEnquiry };
