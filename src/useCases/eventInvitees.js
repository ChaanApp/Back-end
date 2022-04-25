const EventInvitees = require("../models/eventInvitees");

function getAllInvitees(idEvent) {
  return EventInvitees.find({ event: { _id: idEvent } }).populate("event", {
    eventName: 1,
  });
}
function getInviteeById(idInvitee) {
  return EventInvitees.findById(idInvitee);
}
function createInvitee(inviteeData, idEvent) {
  const { nameInvitee, emailInvitee, asignedTicketsInvitee } = inviteeData;
  return EventInvitees.create({
    nameInvitee,
    emailInvitee,
    asignedTicketsInvitee,
    event: idEvent,
  });
}
function updateById(idInvitee, dataUpdate) {
  return EventInvitees.findByIdAndUpdate(idInvitee, dataUpdate, { new: true });
}
function deleteById(idInvitee) {
  return EventInvitees.findByIdAndDelete(idInvitee);
}

module.exports = {
  getAllInvitees,
  getInviteeById,
  createInvitee,
  updateById,
  deleteById,
};
