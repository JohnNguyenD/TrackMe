import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useHistory } from "react-router-dom";
import ShowModal from "./ShowModal";

const API_URL = "https://trackme-ashy.vercel.app/api";

const DeviceList = () => {
  const [devices, setDevices] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const data = async () => {
      const { data } = await axios.get(`${API_URL}/devices`);
      setDevices(data);
    };
    data();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="main container" id="command-class">
        <h1>DEVICE</h1>
        <table id="devices" className="table table-bordered table-hover">
          <thead>
            <tr className="table-primary">
              <th>User</th>
              <th>Device</th>
            </tr>
          </thead>
          <tbody>
            {localStorage.getItem("user") ? (
              <Devices devices={devices} />
            ) : (
              history.push("/login")
            )}
          </tbody>
        </table>
      </div>
      <ShowModal />
      <Footer />
    </div>
  );
};

const Devices = ({ devices }) => {
  return (
    <>
      {devices.map((device, index) => {
        return (
          <tr key={index}>
            <td>{device.user}</td>
            <td>{device.name}</td>
          </tr>
        );
      })}
    </>
  );
};

export default DeviceList;
