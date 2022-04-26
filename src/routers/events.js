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

router.use(auth);
router.get("/:id", async (request, response) => {
  try {
    const idEvent = request.params.id;
    const eventFound = await events.getById(idEvent);
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

router.post("/:id", async (request, response) => {
  try {
    const eventData = request.body;
    const { authorization: token } = request.headers;
    const tokenData = jwt.decode(token);
    const userId = tokenData.id;
    const eventCreated = await events.createEventById(eventData, userId);

    response.json({
      success: true,
      message: "Event create",
      data: {
        event: eventCreated,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: "Event not create",
    });
  }
});
router.patch("/:id", async (request, response) => {
  try {
    const idEvent = request.params.id;
    const eventData = request.body;
    const { authorization: token } = request.headers;
    const tokenData = jwt.decode(token);
    const userId = tokenData.id;
    const eventUpdate = await events.patchById(idEvent, eventData, userId);

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
router.delete("/:id", async (request, response) => {
  try {
    const idEvent = request.params.id;
    const eventData = request.body;
    const { authorization: token } = request.headers;
    const tokenData = jwt.decode(token);
    const userId = tokenData.id;
    const eventDeleted = await events.deleteById(idEvent, eventData, userId);

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
