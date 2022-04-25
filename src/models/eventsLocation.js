const mongoose = require("mongoose");

const adressSchema = new mongoose.Schema({
  adress1: {
    type: String,
    required: true,
  },
  adress2: {
    type: String,
  },
  city: {
    type: String,
  },
  lat: {
    type: String,
  },
  long: {
    type: String,
  },
});

module.exports = adressSchema;
