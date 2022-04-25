const Event = require("../models/events");

function getAllEvents() {
  return Event.find({}).populate("invitees", {
    nameInvitee: 1,
    emailInvitee: 1,
    asignedTicketsInvitee: 1,
  });
}

function createEvent(eventData) {
  const {
    eventType,
    eventName,
    eventNameHost1,
    eventNameHost2,
    eventDate,
    eventInvitation,
    eventLocation,
    eventDressCode,
    eventNumInvitee,
  } = eventData;
  return Event.create({
    eventType,
    eventName,
    eventNameHost1,
    eventNameHost2,
    eventDate,
    eventInvitation,
    eventLocation,
    eventDressCode,
    eventNumInvitee,
  });
}
function getById(idEvent) {
  return Event.findById(idEvent).populate("invitees", {
    nameInvitee: 1,
    emailInvitee: 1,
    asignedTicketsInvitee: 1,
  });
}
function patchById(idEvent, dataEvent) {
  return Event.findByIdAndUpdate(idEvent, dataEvent, { new: true });
}
function deleteById(idEvent) {
  return Event.findByIdAndDelete(idEvent);
}

module.exports = { getAllEvents, createEvent, getById, patchById, deleteById };
