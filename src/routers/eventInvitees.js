const express = require("express");
const useCasesInvitees = require("../useCases/eventInvitees");
const router = express.Router({ mergeParams: true });

router.get("/", async (request, response) => {
  try {
    const idEvent = request.params.idEvent;
    const allInvitees = await useCasesInvitees.getAllInvitees(idEvent);

    response.json({
      success: true,
      message: "All invitees",
      data: {
        invitees: allInvitees,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: "Invitees not found",
    });
  }
});
router.get("/:idInvitee", async (request, response) => {
  try {
    const idInvitee = request.params.idInvitee;
    if (!idInvitee) throw new Error("Invitee not found");

    const inviteeFound = await useCasesInvitees.getInviteeById(idInvitee);

    response.json({
      success: true,
      message: "Invitee found",
      data: {
        invitee: inviteeFound,
      },
    });
  } catch (error) {
    response.status(404);
    response.json({
      success: false,
      message: "Invitee not found",
    });
  }
});

router.post("/", async (request, response) => {
  try {
    const dataInvitee = request.body;
    const idEvent = request.params.idEvent;

    if (!idEvent || !dataInvitee) {
      throw new Error("You need data");
    }
    const newInvitee = await useCasesInvitees.createInvitee(
      dataInvitee,
      idEvent
    );

    response.json({
      success: true,
      message: "Invitee created sucessfully",
      data: {
        invitee: newInvitee,
        event: idEvent,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: "Invitee not create",
    });
  }
});
router.patch("/:idInvitee", async (request, response) => {
  try {
    const idInvitee = request.params.idInvitee;
    const dataUpdate = request.body;
    const inviteeUpdate = await useCasesInvitees.updateById(
      idInvitee,
      dataUpdate
    );
    if (!inviteeUpdate) throw new Error("Invitee not found");

    response.json({
      success: true,
      message: "Invitee updated successfully",
      data: {
        invitee: inviteeUpdate,
      },
    });
  } catch (error) {
    response.status(404);
    response.json({
      success: false,
      message: "Invitee not update",
    });
  }
});
router.delete("/:idInvitee", async (request, response) => {
  try {
    const idInvitee = request.params.idInvitee;
    const inviteeDeleted = await useCasesInvitees.deleteById(idInvitee);

    response.json({
      success: true,
      message: "Invitee deleted",
      data: {
        inviteeDeleted: inviteeDeleted,
      },
    });
  } catch (error) {
    response.status(404);
    response.json({
      success: false,
      message: "Invitee not found",
    });
  }
});

module.exports = router;
