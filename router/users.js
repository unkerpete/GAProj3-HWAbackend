// import express
const express = require("express");
// import router
const router = express.Router();
// import middleware if any

// import functions from controller
const { createUser, login, getUsers } = require("../controllers/users");

// create routes
router.put("/create", createUser);
router.post("/login", login);
router.get("/allusers", getUsers);

// export routes for server.js to access
module.exports = router;
