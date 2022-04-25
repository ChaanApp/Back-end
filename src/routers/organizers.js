const express = require("express");
const useCasesOrganizer = require("../useCases/organizers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const allOrganizers = await useCasesOrganizer.getAllOrganizers();

    response.json({
      success: true,
      message: "All Organizers",
      data: {
        organizer: allOrganizers,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: "Error at get all organizers",
      error: error.message,
    });
  }
});
router.post("/signup", async (request, response) => {
  try {
    console.log(request.body);
    const organizersData = request.body;
    const organizerCreated = await useCasesOrganizer.signUp(organizersData);

    response.json({
      success: true,
      message: "Organizer created",
      data: {
        organizer: organizerCreated,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: " could not register",
      error: error.message,
    });
  }
});
router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const organizerInfo = await useCasesOrganizer.login(email, password);
    console.log(organizerInfo, "organizerInfo");
    response.json({
      success: true,
      message: " organizer logged in",
      data: {
        token: organizerInfo,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: " could not register",
      error: error.message,
    });
  }
});

router.use(auth);

router.get("/:id", async (request, response) => {
  try {
    const idOrganizer = request.params.id;
    const organizerFound = await useCasesOrganizer.getById(idOrganizer);

    response.json({
      success: true,
      message: "Organizer found",
      data: {
        organizer: organizerFound,
      },
    });

    if (!organizerFound) throw new Error("Organizer not found");
  } catch (error) {
    response.status(404);
    response.json({
      success: false,
      message: "Organizer not found",
      error: error.message,
    });
  }
});
router.post("/", async (request, response) => {
  try {
    const dataOrganizer = request.body;
    const newOrganizer = await useCasesOrganizer.createOrganizer(dataOrganizer);

    response.json({
      success: true,
      message: "Organizer created",
      data: {
        organizer: newOrganizer,
      },
    });
  } catch (error) {
    response.json({
      success: false,
      message: "Error to create new organizer",
      error: error.message,
    });
  }
});
router.patch("/:id", async (request, response) => {
  try {
    const idOrganizer = request.params.id;
    const dataToUpdate = request.body;
    const organizerUpdate = await useCasesOrganizer.patchById(
      idOrganizer,
      dataToUpdate,
      { new: true }
    );

    response.json({
      success: true,
      message: "Organizer",
      data: {
        organizer: organizerUpdate,
      },
    });
  } catch (error) {
    response.status(404);
    response.json({
      success: false,
      message: "Organizer not update",
      error: error.message,
    });
  }
});
router.delete("/:id", async (request, response) => {
  try {
    const idOrganizer = request.params.id;
    const organizerDelete = await useCasesOrganizer.deleteById(idOrganizer);

    response.json({
      success: true,
      message: "Organizer deleted",
      data: {
        organizer: organizerDelete,
      },
    });

    if (!organizerFound) throw new Error("Organizer not found");
  } catch (error) {
    response.status(404);
    response.json({
      success: false,
      message: "Organizer not delete",
      error: error.message,
    });
  }
});

module.exports = router;
