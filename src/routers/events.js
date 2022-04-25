const express = require("express");
const usesCasesEvents = require("../useCases/events");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const allEvents = await usesCasesEvents.getAllEvents();

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
router.get("/:id", async (request, response) => {
  try {
    const idEvent = request.params.id;
    const eventFound = await usesCasesEvents.getById(idEvent);
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

router.post("/", async (request, response) => {
  try {
    const eventData = request.body;
    const eventCreated = await usesCasesEvents.createEvent(eventData);

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
    const dataEvent = request.body;
    const eventUpdate = await usesCasesEvents.patchById(idEvent, dataEvent);

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
    const eventDeleted = await usesCasesEvents.deleteById(idEvent);

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
