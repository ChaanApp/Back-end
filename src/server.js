const cors = require("cors");
const express = require("express");
const server = express();

// require router
const eventsRouter = require("./routers/events");
const eventsInviteesRouter = require("./routers/eventInvitees");
const organizersRouter = require("./routers/organizers");

//middlewares
server.use(cors());
server.use(express.json());
// routers
server.use("/events", eventsRouter);
server.use("/events/:idEvent/invitees", eventsInviteesRouter);
server.use("/organizer", organizersRouter);
//exports
module.exports = server;
