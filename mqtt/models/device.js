const mongoose = require("mongoose");
const mqtt = require("mqtt");

const Schema = mongoose.Schema;
const deviceSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  user: {
    type: String,
    require: true,
  },
  sensorData: Array,
});

const device = mongoose.model("Devices", deviceSchema);
module.exports = device;
