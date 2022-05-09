const mongoose = require("mongoose");

const adressSchema = new mongoose.Schema({
  adress: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
  },
  long: {
    type: String,
  },
});

module.exports = adressSchema;
