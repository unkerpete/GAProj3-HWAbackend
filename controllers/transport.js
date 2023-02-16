// import schema from models
const TransportEnquiry = require("../models/transport");

// Function to create new transport enquiry. PUT method.
const createTransportEnquiry = async (req, res) => {
  try {
    const newTransportEnq = await TransportEnquiry.create({
      fullName: req.body.fullName,
      email: req.body.email,
      contact: req.body.contact,
      selection: req.body.selection,
      message: req.body.message,
    });
    // return to frontend with success response
    res.json({
      status: "success",
      message: "created" + newTransportEnq,
    });
  } catch (err) {
    console.log("PUT /transport/create ", err);
    res.status(400).json({ status: "error", message: err.message });
  }
};

// Function to get all submitted transport enquiries. Sorted by latest first. GET method
const showAllTransportEnquiry = async (req, res) => {
  try {
    const allTransResults = await TransportEnquiry.find().sort({
      createdAt: -1,
    });
    res.json(allTransResults);
  } catch (err) {
    console.log("GET /transport/showall ", err);
    res.status(400).json({ status: "error", message: err.message });
  }
};

// To export the functions to router
module.exports = { createTransportEnquiry, showAllTransportEnquiry };
