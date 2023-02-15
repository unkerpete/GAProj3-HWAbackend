// import schema from models
const Contact = require("../models/contact");

// Function to create new transport enquiry. PUT method.
const createContact = async (req, res) => {
  try {
    const contact = await Contact.create({
      fullName: req.body.fullName,
      email: req.body.email,
      selection: req.body.selection,
      enquiry: req.body.enquiry,
      message: req.body.message,
    });
    // return to frontend with success response
    res.json({
      status: "success",
      message: "contact form submitted",
    });
  } catch (err) {
    console.log("PUT /contact/create ", err);
    res.status(400).json({ status: "error", message: err.message });
  }
};

// Function to get all submitted transport enquiries. Sorted by latest first. GET method
const showAllContact = async (req, res) => {
  try {
    const allContactsResult = await Contact.find().sort({
      createdAt: -1,
    });
    res.json(allContactsResult);
  } catch (err) {
    console.log("GET /contact/showall ", err);
    res.status(400).json({ status: "error", message: err.message });
  }
};

// To export the functions to router
module.exports = { createContact, showAllContact };
