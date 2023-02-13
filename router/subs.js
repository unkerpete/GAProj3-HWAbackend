// import express
const express = require("express");
// import router
const router = express.Router();
// import middleware if any

// import functions from controller
const {
  createSubscription,
  showSubscriptions,
} = require("../controllers/subs");

// Create Route - create a new subscription entry
router.put("/create", createSubscription);

// READ Route - shows all subscription
router.get("/showall", showSubscriptions);

// export routes for server.js to access
module.exports = router;
