// import express
const express = require("express");
// import router
const router = express.Router();

// import uploadImage function from controller
const { uploadImage } = require("../controllers/image");

// CREATE(Upload) image route - upload a new image
router.put("/create", uploadImage);

// export routes for server.js to access
module.exports = router;
