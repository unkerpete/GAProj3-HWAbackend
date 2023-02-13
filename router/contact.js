// import express
const express = require("express");
// import router
const router = express.Router();
// import middleware if any

// import subs functions from controller
const { createContact, showAllContact } = require("../controllers/contact");

// CREATE sub route - create a new subscription entry
router.put("/create", createContact);

// READ subs route - shows all subscription
router.get("/showall", showAllContact);

// export routes for server.js to access
module.exports = router;
