// import express
const express = require("express");
// import router
const router = express.Router();

// import transportEnquiry functions from controller
const {
  createVolunteerEnquiry,
  showAllVolunteerEnquiry,
} = require("../controllers/volunteer");

// CREATE transportEnquiry route - create a new transport enquiry
router.put("/create", createVolunteerEnquiry);

// READ transportEnquiry route - shows all transport enquiry
router.get("/showall", showAllVolunteerEnquiry);

// export routes for server.js to access
module.exports = router;
