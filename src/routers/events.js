const express = require("express");
const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");

const router = express.Router();
const events = require("../useCases/events");

router.get("/", async (request, response) => {
  try {
    const allEvents = await events.getAllEvents();

    response.json({
      success: true,
      message: "All events",
      data: {
        events: allEvents,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: "Error at get all events",
    });
  }
});

//router.use(auth);
router.get("/organizer", auth, async (request, response) => {
  try {
    // const organizer = request.params.id_organizer;
    //userCurrent!!!!! y ya no se usa el otro
    const organizer = request.userCurrent;
    const getAllEventsById = await events.getllEventsById(organizer);
    response.json({
      success: true,
      message: "All events organizer by id",
      data: {
        events: getAllEventsById,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: `Error at get all events by id, ${error}`,
    });
  }
});

router.get("/:id", auth, async (request, response) => {
  try {
    const organizer = request.userCurrent;
    const idEvent = request.params.id;
    const eventFound = await events.getById(idEvent, organizer);
    if (!eventFound) throw new Error("Event not found");

    response.json({
      success: true,
      message: "Event found",
      data: {
        events: eventFound,
      },
    });
  } catch (error) {
    response.status(404);
    response.json({
      success: false,
      message: "Event not found",
    });
  }
});

router.post("/:id", auth, async (request, response) => {
  try {
    const organizer = request.userCurrent;
    const eventData = request.body;
    //const { authorization: token } = request.headers;
    //const tokenData = jwt.decode(token);
    //const userId = tokenData.id;
    const eventCreated = await events.createEventById(eventData, organizer);

    response.json({
      success: true,
      message: "Event create",
      data: {
        event: eventCreated,
      },
    });
  } catch (error) {
    //response.status(400);
    response.json({
      success: false,
      message: `Event not create, ${error}`,
    });
  }
});
router.put("/:id", auth, async (request, response) => {
  try {
    const organizer = request.userCurrent;
    const idEvent = request.params.id;
    const eventData = request.body;
    //const { authorization: token } = request.headers;
    //const tokenData = jwt.decode(token);
    //const userId = tokenData.id;
    const eventUpdate = await events.putById(idEvent, eventData, organizer);

    if (!eventUpdate) throw new Error("Event not found");
    response.json({
      success: true,
      message: "Event update",
      data: {
        event: eventUpdate,
      },
    });
  } catch (error) {
    response.status(404);
    response.json({
      success: false,
      message: "Event not uptdate",
    });
  }
});
router.delete("/:id", auth, async (request, response) => {
  try {
    const organizer = request.userCurrent;
    const idEvent = request.params.id;
    const eventData = request.body;
    //const { authorization: token } = request.headers;
    //const tokenData = jwt.decode(token);
    //const userId = tokenData.id;
    const eventDeleted = await events.deleteById(idEvent, eventData, organizer);

    if (!eventDeleted) throw new Error("Event not found");

    response.json({
      success: true,
      message: "Event deleted",
      data: {
        eventDeleted: eventDeleted,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: "Event not delete",
    });
  }
});

module.exports = router;
