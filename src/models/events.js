const mongoose = require("mongoose");
const adressSchema = require("./eventsLocation");

const eventsSchema = new mongoose.Schema({
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "organizer",
  },

  eventType: {
    type: String,
    required: true,
    trim: true,
    enum: [
      "Boda",
      "Cumpleaños",
      "Bautizo",
      "Baby Shower",
      "Graduación",
      "Concierto",
      "Exposición",
      "Quince Años",
      "Clase",
      "Deportivo",
      "Conferencia",
      "Esparcimiento",
      "undefined",
    ],
    default: "Boda",
  },
  eventName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  detailsEvent: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 280,
    trim: true,
  },
  eventDressCode: {
    type: String,
    enum: ["Formal", "Informal", "Casual", "Negocios", "Coktail", "undefined"],
    required: true,
    trim: true,
    default: "Formal",
  },
  eventDate: {
    type: String,
    /*default: Date.now,*/
    required: true,
    trim: true,
  },
  timeDate: {
    type: String,
    /*default: Date.now,*/
    required: true,
    trim: true,
  },

  //Ubicacion !!!!!
  eventLocation: adressSchema,

  eventNumInvitee: {
    type: Number,
    required: false,
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
