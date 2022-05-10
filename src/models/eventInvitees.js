const mongoose = require("mongoose");

const eventInviteesSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "events",
  },
  nameInvitee: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  emailInvitee: {
    type: String,
    required: true,
    match: /.+@.+\..+/,
  },
  asignedTicketsInvitee: {
    type: Number,
    required: false,
    trim: true,
  },
});

const model = mongoose.model("eventInvitees", eventInviteesSchema);
module.exports = model;
