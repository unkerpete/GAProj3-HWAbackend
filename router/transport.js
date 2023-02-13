// import express
const express = require("express");
// import router
const router = express.Router();

// import transportEnquiry functions from controller
const {
  createTransportEnquiry,
  showAllTransportEnquiry,
} = require("../controllers/transport");

// CREATE transportEnquiry route - create a new transport enquiry
router.put("/create", createTransportEnquiry);

// READ transportEnquiry route - shows all transport enquiry
router.get("/showall", showAllTransportEnquiry);

// export routes for server.js to access
module.exports = router;
