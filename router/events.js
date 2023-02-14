// import express
const express = require("express");
// import router
const router = express.Router();

// import functions from controller
const {
  // createEvent, // FIXME:
  getAllEvents,
  getEventsByDateRange,
  getEventsByTagAndDateRange,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

// MULTER stuffs
const Events = require("../models/events");
const multer = require("multer");
const fs = require("fs");

// To handle file uploads
const storage = multer.diskStorage({
  // declare the destination for the file in client side
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  // file name saved as the original file name when uploaded
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// CREATE a single event (with middleware included)
router.put("/create", upload.single("eventI"), async (req, res) => {
  try {
    const newEvent = new Events({
      title: req.body.title,
      // dateStart: req.body.dateStart,
      // dateEnd: req.body.dateEnd,
      timeString: req.body.timeString,
      description: req.body.description,
      img: {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: "image/jpg",
      },
      action: req.body.action,
      tag: req.body.tag,
    });

    const savedEvent = await newEvent.save();
    console.log("image saved");
    res.json({
      message: "Event created successfully",
    });
  } catch (error) {
    console.log("PUT /events/create", error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

// READ show all events
router.get("/showall", getAllEvents);

// READ show events within a specified date range
router.get("/showbyrange", getEventsByDateRange);

// READ show events within a specified date range
router.get("/showbytagrange", getEventsByTagAndDateRange);

// UPDATE event by ID
router.patch("/showbytagrange", updateEvent);

// DELETE event by ID
router.delete("/delete", deleteEvent);

// export routes for server.js to access
module.exports = router;
