const mongoose = require("mongoose");
const adressSchema = require("./eventsLocation");

const eventsSchema = new mongoose.Schema({
  eventOrganizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "organizer",
  },
  eventName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  eventType: {
    type: String,
    required: true,
    trim: true,
    enum: ["wedding", "birthday", "christening", "babyShower"],
    default: "wedding",
  },
  eventNameHost1: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  eventNameHost2: {
    type: String,
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  eventDate: {
    type: Date,
    default: Date.now,
    required: true,
    trim: true,
  },
  eventInvitation: {
    type: String,
    required: true,
    enum: ["invitation01", "invitation02", "invitation03"],
    default: "invitacion01",
  },
  eventLocation: adressSchema,
  eventDressCode: {
    type: String,
    enum: ["formal", "informal", "casual", "business", "coktail"],
    default: "formal",
    required: true,
    trim: true,
  },
  eventNumInvitee: {
    type: Number,
    required: true,
    min: 2,
    max: 500,
    trim: true,
  },
  invitees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "eventInvitees",
    },
  ],
});

const model = mongoose.model("events", eventsSchema);
module.exports = model;
