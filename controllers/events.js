// import schema from models
const Events = require("../models/events");

const moment = require("moment-timezone");

// 1. Function for seeding

// 2. Function for creating
const createEvent = async (req, res) => {
  try {
    const newEvent = new Events({
      title: req.body.title,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      timeString: req.body.timeString,
      description: req.body.description,
      img: req.body.img,
      action: req.body.action,
      tag: req.body.tag,
    });

    const savedEvent = await newEvent.save();
    res.json({
      message: "Event created successfully",
      createdEvent: savedEvent,
    });
  } catch (error) {
    res.json(error);
  }
};
// 3. Function for reading all
const getAllEvents = async (req, res) => {
  try {
    const events = await Events.find({});
    res.json({ events });
  } catch (error) {
    res.json(error);
  }
};

// 3. Function for reading a specified number of events based on date range
const getEventsByDateRange = async (req, res) => {
  try {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    const events = await Events.find({
      dateStart: { $gte: startDate, $lte: endDate },
    });

    res.json({ events });
  } catch (error) {
    res.json(error);
  }
};

// 3. Function for reading a specified number of events based on date range AND tag
const getEventsByTagAndDateRange = async (req, res) => {
  try {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    const events = await Events.find({
      tag: req.body.tag,
      dateStart: { $gte: startDate, $lte: endDate },
    });

    res.json({ events });
  } catch (error) {
    res.json(error);
  }
};

// 4. Function for updating events
const updateEvent = async (req, res) => {
  try {
    const event = await Events.findById(req.body.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    } else {
      event.title = req.body.title;
      event.dateStart = req.body.dateStart;
      event.dateEnd = req.body.dateEnd;
      event.timeString = req.body.time;
      event.description = req.body.description;
      event.img = req.body.img;
      event.action = req.body.action;
      event.tag = req.body.tag;
    }
    const updatedEvent = await event.save();
    res.json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    res.json(error);
  }
};
// 5. Function for deleting (one event at a time)
const deleteEvent = async (req, res) => {
  try {
    const event = await Events.findById(req.params.id);
    if (!event) {
      return res.json({ status: "not found", message: "Event not found" });
    }

    await event.remove();
    res.json({ status: "ok", message: "Event deleted successfully" });
  } catch (error) {
    res.json(error);
  }
};
// To export the functions to router
module.exports = {
  createEvent,
  getAllEvents,
  getEventsByDateRange,
  getEventsByTagAndDateRange,
  updateEvent,
  deleteEvent,
};
