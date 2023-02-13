// import express
const express = require("express");
// import router
const router = express.Router();
// import middleware if any

// import functions from controller
const { createSubscription } = require("../controllers/subs");

// create routes
router.put("/create", createSubscription);

// export routes for server.js to access
module.exports = router;
