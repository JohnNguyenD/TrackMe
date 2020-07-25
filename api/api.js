const express = require("express");
const mongoose = require("mongoose");
const Device = require("./models/device");
const command = require("./models/command");
const User = require("./models/user");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
// Parse the body
const bodyParser = require("body-parser");
const { findOneAndUpdate } = require("./models/user");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Define port
const port = process.env.PORT || 5000;

//Middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/test", (req, res) => {
  res.send("The API is working!");
});

//Find devices
app.get("/api/devices", (req, res) => {
  Device.find({}, (err, devices) => {
    if (err == true) {
      return res.send(err);
    } else {
      return res.send(devices);
    }
  });
});

//Post new device
app.post("/api/devices", (req, res) => {
  const { name, user, sensorData } = req.body;
  const newDevice = new Device({
    name,
    user,
    sensorData,
  });
  newDevice.save((err) => {
    return err ? res.send(err) : res.send("Sucessfully added device and data");
  });
});

//Post new command
app.post("/api/send-command", (req, res) => {
  const { body } = req.body;
  console.log(req.body);
});

//Post an authenticattion
app.post("/api/authenticate", (req, res) => {
  const { name, password } = req.body;
  User.findOne({
    name,
  })
    .then((user) => {
      if (!user) {
        return res.json({
          success: false,
          message: "User not found",
        });
      }
      if (user.password !== req.body.password) {
        return res.json({
          success: false,
          message: "Password Incorrect",
        });
      } else {
        return res.json({
          success: true,
          message: "Login succesfully",
          isAdmin: user.isAdmin,
        });
      }
    })
    .catch((error) => res.send(error));
});

//Post a registration
app.post("/api/registration", (req, res) => {
  const { name, password, isAdmin } = req.body;
  User.findOne({
    name,
  })
    .then((user) => {
      if (user) {
        return res.json({
          success: false,
          message: "Username has already existed",
        });
      } else {
        const newUser = new User({
          name: req.body.name,
          password: req.body.password,
          isAdmin: req.body.isAdmin,
        });
        newUser.save((err) => {
          return err
            ? res.send(err)
            : res.json({
                success: true,
                message: "Created new user",
              });
        });
      }
    })
    .catch((error) => res.send(error));
});

//Post a device history
app.get("/api/devices/:deviceId/device-history", (req, res) => {
  const { deviceId } = req.params;
  Device.findOne({ _id: deviceId }, (err, devices) => {
    const { sensorData } = devices;
    return err ? res.send(err) : res.send(sensorData);
  });
});

//Get devices for loggin user
app.get("/api/users/:user/devices", (req, res) => {
  const { user } = req.params;
  Device.find({ user: user }, (err, devices) => {
    return err ? res.send(err) : res.send(devices);
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
