const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const { API_URL } = process.env;

//Test finding devices
test("test device array", () => {
  expect.assertions(1);
  return axios
    .get(`${API_URL}/devices`)
    .then((resp) => resp.data)
    .then((resp) => {
      expect(resp[0].user).toEqual("mary123");
    });
});

//Test posting new devices
test("test add device in array", () => {
  expect.assertions(1);
  const body = {
    name: "John's iPhone",
    user: "John",
    sensorData: [],
  };
  return axios.post(`${API_URL}/devices`, body).then(
    (resp) => {
      expect(JSON.parse(resp.config.data)).toEqual(body);
    },
    (error) => {
      console.log(error);
    }
  );
});

//Test authenticate
test("Test authenticated", () => {
  expect.assertions(1);
  const body = {
    name: "JohnT",
    password: "dad",
  };
  const message = "Login successfully";

  return axios.post(`${API_URL}/authenticate`, body).then(
    (resp) => {
      expect(resp.data.message).toEqual(message);
    },
    (error) => {
      console.log(error);
    }
  );
});

//Test registration
test("Test registration", () => {
  expect.assertions(1);
  const body = {
    name: "Bioshock",
    password: "dad",
    isAdmin: true,
  };

  const message = "Created new user";

  return axios.post(`${API_URL}/registration`, body).then(
    (resp) => {
      expect(resp.data.message).toEqual(message);
    },
    (error) => {
      console.log(error);
    }
  );
});

//Test get device history
test("Test get device history", () => {
  expect.assertions(1);
  const deviceID = "5f17d685c6e309d3d2091fdd";
  return axios.get(`${API_URL}/devices/${deviceID}/device-history`).then(
    (resp) => {
      expect(resp.data[0].temp).toEqual(14);
    },
    (error) => console.log(error)
  );
});

//Test get devices for loggin user
test("Test loggin user's devices", () => {
  expect.assertions(1);
  const user = "sam";
  return axios.get(`${API_URL}/users/${user}/devices`).then(
    (resp) => {
      console.log(resp);
      expect(resp.data[0].user).toEqual(user);
    },
    (error) => console.log(error)
  );
});
