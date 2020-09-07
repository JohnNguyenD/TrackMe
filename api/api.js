const express = require("express");
const mongoose = require("mongoose");
const Device = require("./models/device");
const command = require("./models/command");
const User = require("./models/user");

mongoose.connect(
  "mongodb+srv://JohnNguyen:t30101999@cluster0.cc3dy.mongodb.net",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const app = express();
app.use(express.static("public"));

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

/**
* @api {get} /api/devices AllDevices An array of all devices
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
2 / 3
*[
*  {
*    "_id": "dsohsdohsdofhsofhosfhsofh",
*    "name": "Mary's iPhone",
*    "user": "mary",
*    "sensorData": [
*      {
*        "ts": "1529542230",
*        "temp": 12,
*        "loc": {
*          "lat": -37.84674,
*          "lon": 145.115113
*        }
*      },
*      {
*        "ts": "1529572230",
*        "temp": 17,
*        "loc": {
*          "lat": -37.850026,
*          "lon": 145.117683
*        }
*      }
*    ]
*  }
*]
* @apiErrorExample {json} Error-Response:
*   {
*     "User does not exist"
*   }
*/

app.use(express.static(`${__dirname}/public/generated-docs`));

app.get("/docs", (req, res) => {
  res.sendFile(`${__dirname}/public/generated-docs/index.html`);
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

/**
 * @api {post} /api/authenticate Authenticate Account
 * @apiGroup Authenticate
 * @apiSuccessExample {json} Success-Response:
 *{
 *  "success": true,
 *  "message": "Login successfully",
 *  "isAdmin": true
 *}
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "success": false,
 *     "message": "User not found"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "success": false,
 *     "message": "Password Incorrect"
 *   }
 */

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
          message: "Login successfully",
          isAdmin: user.isAdmin,
        });
      }
    })
    .catch((error) => res.send(error));
});

/**
 * @api {post} /api/registration Register New Account
 * @apiGroup Register
 * @apiSuccessExample {json} Success-Response:
 *{
 *  "success": true,
 *  "message": "Created new user"
 *}
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "success": false,
 *     "message": "Username has already existed"
 *   }
 */

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

/**
 * @api {get} /api/devices/:deviceId/device-history Get a device history
 * @apiGroup Device-history
 * @apiSuccessExample {json} Success-Response:
 *{
 * [
 *  {
 *       "ts": "1529542743",
 *       "temp": 14,
 *       "loc": {
 *           "lat": 33.812092,
 *           "lon": -117.918974
 *       }
 *   }
 *]
 *}
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "deviceId is incorrect"
 *   }
 */

//Post a device history
app.get("/api/devices/:deviceId/device-history", (req, res) => {
  const { deviceId } = req.params;
  Device.findOne({ _id: deviceId }, (err, devices) => {
    const { sensorData } = devices;
    return err ? res.send(err) : res.send(sensorData);
  });
});

/**
 * @api {get} /api/users/:user/devices Get a device for loggin user
 * @apiGroup User-devices
 * @apiSuccessExample {json} Success-Response:
 *{
 * [
 *   {
 *       "sensorData": [
 *           {
 *               "ts": "1529572230",
 *               "temp": 14,
 *               "loc": {
 *                   "lat": -37.850026,
 *                   "lon": 145.117683
 *               }
 *           }
 *       ],
 *       "_id": "5f17d685c6e309d3d2091fdd",
 *       "id": 2,
 *       "name": "Sam's iPhone",
 *       "user": "sam"
 *   }
]
 *}
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "userName is incorrect"
 *   }
 */

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
