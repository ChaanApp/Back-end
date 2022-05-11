const { default: mongoose } = require("mongoose");
const Event = require("../models/events");

function getAllEvents() {
  return Event.find({}).populate("invitees", {
    nameInvitee: 1,
    emailInvitee: 1,
    asignedTicketsInvitee: 1,
  });
}

function getllEventsById(userId) {
  console.log("estoy en findeAllEventsById");
  return Event.find({ organizer: userId }).populate("invitees");
}

function createEventById(eventData, userId) {
  console.log("estoy en eventById");
  return Event.create({
    ...eventData,
    organizer: userId,
  });
}
function getById(idEvent) {
  return Event.findById(idEvent).populate("invitees", {
    nameInvitee: 1,
    emailInvitee: 1,
    asignedTicketsInvitee: 1,
  });
}

function putById(idEvent, dataEvent) {
  return Event.findByIdAndUpdate(idEvent, dataEvent, { new: true });
}
function deleteById(idEvent) {
  return Event.findByIdAndDelete(idEvent);
}

module.exports = {
  getAllEvents,
  getllEventsById,
  createEventById,
  getById,
  putById,
  deleteById,
};
