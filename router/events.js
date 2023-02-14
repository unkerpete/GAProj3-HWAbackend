// import express
const express = require("express");
// import router
const router = express.Router();

// import functions from controller
const {
  seedEvents,
  createEvent,
  getAllEvents,
  getEventsByDateRange,
  getEventsByTagAndDateRange,
  updateEvent,
  deleteEvent,
  getCurrentEventsWithinDateRangeByCategory,
  getUpcomingEventsAfterCurrentEventsByCategory,
} = require("../controllers/events");

// CREATE SEED events data. This will delete all events and create default list of events
router.put("/danger_this_deletes_everything", seedEvents);

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

// READ current events by category(ies)
router.get("/currentevents", getCurrentEventsWithinDateRangeByCategory);

// READ upcoming events by category(ies)
router.get("/upcomingevents", getUpcomingEventsAfterCurrentEventsByCategory);

// export routes for server.js to access
module.exports = router;
