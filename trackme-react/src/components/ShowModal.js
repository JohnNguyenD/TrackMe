import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button, Modal } from "react-bootstrap";

const API_URL = "https://trackme-ashy.vercel.app/api";

const getSensorData = async (deviceId) => {
  const { data } = await axios.get(
    `${API_URL}/devices/${deviceId}/device-history`
  );
  return data;
};
const getDeviceId = async () => {
  const currentUser = await localStorage.getItem("user");
  const { data } = await axios.get(`${API_URL}/users/${currentUser}/devices`);
  return data[0]._id;
};

const ShowModal = () => {
  const [sensors, setSensors] = useState([]);
  const [show, setShow] = useState(false);
  const [deviceId, setDeviceId] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    getSensorData(deviceId).then((data) => {
      setSensors((prev) => [...prev, ...data]);
      setShow(true);
    });
  };

  useEffect(() => {
    getDeviceId().then((id) => setDeviceId(id));
  });

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Device History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Temperature</th>
                <th>Latitude</th>
                <th>Longtitude</th>
              </tr>
            </thead>
            <tbody id="historyContent">
              {sensors !== [] ? (
                <Sensors sensors={sensors} handleShow={handleShow} />
              ) : (
                <div></div>
              )}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </>
  );
};
const Sensors = ({ sensors }) => {
  return (
    <>
      {sensors.map((sensorData, index) => {
        return (
          <tr key={index}>
            <td>{sensorData.ts}</td>
            <td>{sensorData.temp}</td>
            <td>{sensorData.loc.lat}</td>
            <td>{sensorData.loc.lon}</td>
          </tr>
        );
      })}
    </>
  );
};
export default ShowModal;
