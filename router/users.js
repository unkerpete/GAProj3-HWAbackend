// import express
const express = require("express");
// import router
const router = express.Router();
// import middleware if any

// import functions from controller
const { createUser } = require("../controllers/users");

// create routes
router.put("/create", createUser);

// export routes for server.js to access
module.exports = router;
