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

// 2. Function for login
const login = async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.body.username });
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "username/password issue" });
    }
    // Encrypt the password coming with the same encryption factors as the one in CREATE then compare
    const result = await bcrypt.compare(req.body.password, user.hash);
    if (!result) {
      return res
        .status(401)
        .json({ status: "error", message: "username/password issue" });
    }

    const payload = {
      id: user._id,
      username: user.username,
    };

    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "60m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "30D",
      jwtid: uuidv4(),
    });

    const response = { access, refresh };
    res.json(response);
  } catch (err) {
    console.log("POST /users/login", err);
    res
      .status(400)
      .json({ status: "error", message: "username/password issue" });
  }
};

// 3.

module.exports = { createUser, login };
