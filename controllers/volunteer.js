// import schema from models
const VolunteerEnquiry = require("../models/volunteer");

// Function to create new transport enquiry. PUT method.
const createVolunteerEnquiry = async (req, res) => {
  try {
    const volunteerEnq = await VolunteerEnquiry.create({
      fullName: req.body.fullName,
      email: req.body.email,
      contact: req.body.contact,
      company: req.body.company,
      message: req.body.message,
    });
    // return to frontend with success response
    res.json({
      status: "success",
      message: "volunteer enquiry submitted",
    });
  } catch (err) {
    console.log("PUT /volunteer/create ", err);
    res.status(400).json({ status: "error", message: err.message });
  }
};

// Function to get all submitted transport enquiries. Sorted by latest first. GET method
const showAllVolunteerEnquiry = async (req, res) => {
  try {
    const allHomeCareResults = await VolunteerEnquiry.find().sort({
      createdAt: -1,
    });
    res.json(allHomeCareResults);
  } catch (err) {
    console.log("GET /volunteer/showall ", err);
    res.status(400).json({ status: "error", message: err.message });
  }
};

// To export the functions to router
module.exports = { createVolunteerEnquiry, showAllVolunteerEnquiry };
