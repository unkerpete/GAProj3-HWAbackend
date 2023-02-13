// import express
const express = require("express");
// import router
const router = express.Router();

// import transportEnquiry functions from controller
const {
  createHomeCareEnquiry,
  showAllHomeCareEnquiry,
} = require("../controllers/homecare");

// CREATE transportEnquiry route - create a new transport enquiry
router.put("/create", createHomeCareEnquiry);

// READ transportEnquiry route - shows all transport enquiry
router.get("/showall", showAllHomeCareEnquiry);

// export routes for server.js to access
module.exports = router;
