// import express
const express = require("express");
// import router
const router = express.Router();
//import auth
const auth = require("../middleware/auth");

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
  getPastEventsByCategory,
} = require("../controllers/events");

////////////////////////////
// Handling Image Events
const multer = require("multer");

const storage = multer.diskStorage({
  // declare the destination for the file in server side
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  // file name saved as the original file name when uploaded
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
////////////////////////////////////////////////////////////////////////

// CREATE SEED events data. This will delete all events and create default list of events
router.put("/danger_this_deletes_everything", seedEvents);

// CREATE a single event
router.put("/create", auth, upload.single("eventImg"), createEvent);

// READ show all events
router.get("/showall", auth, getAllEvents);

// READ show events within a specified date range
router.post("/showbyrange", getEventsByDateRange);

// READ show events within a specified date range
router.get("/showbytagrange", getEventsByTagAndDateRange);

// UPDATE event by ID
router.patch("/update", auth, upload.single("eventImg"), updateEvent);

// DELETE event by ID
router.delete("/delete", auth, deleteEvent);

// READ current events by category(ies)
router.post("/currentevents", getCurrentEventsWithinDateRangeByCategory);

// READ upcoming events by category(ies)
router.post("/upcomingevents", getUpcomingEventsAfterCurrentEventsByCategory);

// READ upcoming events by category(ies)
router.post("/pastevents", getPastEventsByCategory);

// export routes for server.js to access
module.exports = router;
