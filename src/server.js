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
server.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
// routers
server.use("/events", eventsRouter);
server.use("/events/:idEvent/invitees", eventsInviteesRouter);
server.use("/organizer", organizersRouter);
//exports
module.exports = server;
