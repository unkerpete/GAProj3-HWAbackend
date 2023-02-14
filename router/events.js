// import express
const express = require("express");
// import router
const router = express.Router();
// import functions from controller
const {
  createEvent,
  getAllEvents,
  getEventsByDateRange,
  getEventsByTagAndDateRange,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

// CREATE a single event
router.put("/create", createEvent);

// READ show all events
router.get("/showall", getAllEvents);

// READ show events within a specified date range
router.get("/showbyrange", getEventsByDateRange);

// READ show events within a specified date range
router.get("/showbytagrange", getEventsByTagAndDateRange);

// UPDATE event by ID
router.patch("/update", updateEvent);

// DELETE event by ID
router.delete("/delete", deleteEvent);

// export routes for server.js to access
module.exports = router;
