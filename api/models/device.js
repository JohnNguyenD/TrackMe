const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Devices",
  new mongoose.Schema({
    id: Number,
    name: String,
    user: String,
    sensorData: Array,
  })
);
