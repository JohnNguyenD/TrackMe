const mqtt = require("mqtt");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const randomCoordinates = require("random-coordinates");
const Device = require("./models/device");
const random = require("random-int");
require("dotenv").config();
const { json } = require("body-parser");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const port = process.env.PORT || 5001;

app.use(express.static("public"));

//Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on("connect", () => {
  client.subscribe("/sensorData");
});

client.on("message", (topic, message) => {
  if (topic == "/sensorData") {
    const data = JSON.parse(message);

    Device.findOne({ name: data.deviceId }, (err, device) => {
      if (err) console.log(err);

      const { sensorData } = device;
      const { ts, loc, temp } = data;

      sensorData.push({ ts, loc, temp });
      device.sensorData = sensorData;

      device.save((err) => {
        if (err) console.log(err);
      });
    });
  }
});

app.use(express.static(`${__dirname}/public/generated-docs`));

app.get("/docs", (req, res) => {
  res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

/**
 * @api {get}/sensor-data Generate value
 * @apiGroup PutValue
 * @apiSuccessExample {json} Success-Response:
 *{
 *   "body": "Put new sensor data"
 *}
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error"
 *   }
 */

//Generated value for the data
app.put("/sensor-data", (req, res) => {
  const { deviceId } = req.body;

  const [lat, lon] = randomCoordinates().split(",");
  const ts = new Date().getTime();
  const loc = { lat, lon };
  const temp = random(20, 50);

  const topic = `/sensorData`;
  const message = JSON.stringify({ deviceId, ts, loc, temp });

  client.publish(topic, message, () => {
    res.send("Put new sensor data");
  });
});

/**
 * @api {post}/send-command Send command
 * @apiGroup Command
 * @apiSuccessExample {json} Success-Response:
 *{
 *   "body": "publish new message"
 *}
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error"
 *   }
 */
//Send command
app.post("/send-command", (req, res) => {
  const { deviceId, command } = req.body;
  const topic = `/217433895/command/${deviceId}`;
  client.publish(topic, command, () => {
    res.send("publish new message");
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const topic = "/217433895/test/hello";
const msg = "Hello MQTT world!";
client.publish(topic, msg, () => {
  console.log("message sent...");
});
