const Events = require("../models/events");  // import schema from models
const eventsList = require("../Seeds/eventSeeds"); // import seeds
const fs = require("fs"); // import filesystem module

// 1. Function for seeding
const seedEvents = async (req, res) => {
  try {
    await Events.deleteMany();
    await Events.create(eventsList);
    res.json({ status: "ok", message: "re-seeded successfully" });
  } catch (err) {
    res.json({ status: "failed", message: err });
  }
};

// 2. Function for creating
const createEvent = async (req, res) => {
  try {
    const newEvent = new Events({
      title: req.body.title,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
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
      createdEvent: savedEvent,
    });
  } catch (error) {
    console.log("PUT /events/create", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

// 3. Function for reading all, sorted by date of event
const getAllEvents = async (req, res) => {
  try {
    const events = await Events.find({}).sort({
      dateStart: -1,
    });
    res.json({ events });
  } catch (error) {
    res.json(error);
  }
};

// 4. Function for reading a specified number of events based on date range
const getEventsByDateRange = async (req, res) => {
  try {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    // const startDate = req.body.startDate;
    // const endDate = req.body.endDate;
    console.log(startDate, endDate);
    const events = await Events.find({
      dateStart: { $gte: startDate, $lte: endDate },
    }).sort({
      dateStart: -1,
    });

    res.json({ events });
  } catch (error) {
    res.json(error);
  }
};

// 5. Function for reading a specified number of events based on date range AND tag
const getEventsByTagAndDateRange = async (req, res) => {
  try {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    const events = await Events.find({
      tag: req.body.tag,
      dateStart: { $gte: startDate, $lte: endDate },
    }).sort({
      dateStart: -1,
    });

    res.json({ events });
  } catch (error) {
    res.json(error);
  }
};

// FIXME: need to update for img
// 6. Function for updating events
const updateEvent = async (req, res) => {
  try {
    const event = await Events.findById(req.body.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    } else {
      event.title = req.body.title;
      event.dateStart = req.body.dateStart;
      event.dateEnd = req.body.dateEnd;
      event.timeString = req.body.timeString;
      event.description = req.body.description;
      // FIXME: NEED TO DOUBLE CHECK THIS FROM FRONT END. POSTMAN WORKS
      event.img = {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: "image/jpg",
      };
      event.action = req.body.action;
      event.tag = req.body.tag;
    }
    const updatedEvent = await event.save();
    res.json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    console.log(error.message);
  }
};
// 7. Function for deleting (one event at a time)
const deleteEvent = async (req, res) => {
  try {
    const event = await Events.findById(req.body.id);
    if (!event) {
      return res.json({ status: "not found", message: "Event not found" });
    }

    await event.remove();
    res.json({ status: "ok", message: "Event deleted successfully" });
  } catch (error) {
    res.json(error);
  }
};

// 8. Function for Current Events. Can select by multiple tags
const getCurrentEventsWithinDateRangeByCategory = async (req, res) => {
  const today = new Date();
  const withinTheseDays = new Date();
  withinTheseDays.setDate(today.getDate() + parseInt(req.body.withinTheseDays));

  const tag = req.body.tag || [];
  try {
    const events = await Events.find({
      dateStart: { $gte: today, $lte: withinTheseDays },
      tag: { $in: tag },
    }).sort({
      dateStart: 1,
    });
    if (!events) {
      res.json({
        message: "no events of selected tag in the next 3 days",
      });
      console.log("error");
    }
    res.json({ events });
  } catch (err) {
    console.log(err.message);
  }
};

// 9. Function for Upcoming Events. Can select multiple tags
const getUpcomingEventsAfterCurrentEventsByCategory = async (req, res) => {
  const today = new Date();
  const afterTheseDays = new Date();
  afterTheseDays.setDate(today.getDate() + parseInt(req.body.afterTheseDays));

  const tag = req.body.tag || [];
  try {
    const events = await Events.find({
      dateStart: { $gt: afterTheseDays },
      tag: { $in: tag },
    }).sort({
      dateStart: 1,
    });
    if (!events) {
      res.json({
        message: "no events of selected tag after 3 days from now",
      });
    }
    res.json({ events });
  } catch (err) {
    console.log(err.message);
  }
};

// 9. Function for Upcoming Events. Can select multiple tags
const getPastEventsByCategory = async (req, res) => {
  const today = new Date();
  const tag = req.body.tag || [];

  try {
    const events = await Events.find({
      dateStart: { $lt: today },
      tag: { $in: tag },
    }).sort({
      dateStart: -1,
    });
    if (!events) {
      res.json({
        message: "no past events",
      });
    }
    res.json({ events });
  } catch (err) {
    console.log(err.message);
  }
};

// To export the functions to router
module.exports = {
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
};
