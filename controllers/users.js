// import schema from models
const Users = require("../models/users");
// import necessary encryption
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// 1. Function for creating accounts
const createUser = async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).json({
        status: "error",
        message: "user already exists",
      });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const createUser = await Users.create({
      username: req.body.username,
      hash,
    });

    console.log("Created User: " + createUser);
    res.json({ status: "success", message: "user created successfully" });
  } catch (err) {
    console.log("PUT /users/create", err);
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
};

// 2. Function for updating user details

// 3.

module.exports = { createUser };
