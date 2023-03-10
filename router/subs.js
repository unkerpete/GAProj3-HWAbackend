// import express
const express = require("express");
// import router
const router = express.Router();
// import middleware if any

// import subs functions from controller
const {
  createSubscription,
  showSubscriptions,
} = require("../controllers/subs");

// CREATE sub route - create a new subscription entry
router.put("/create", createSubscription);

// READ subs route - shows all subscription
router.get("/showall", showSubscriptions);

// export routes for server.js to access
module.exports = router;
