import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useHistory } from "react-router-dom";

const MQTT_URL = "http://localhost:5001";

const SendCommand = () => {
  const history = useHistory();
  const [state, setState] = useState({
    deviceID: "",
    command: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const body = {
      deviceID: state.deviceID,
      command: state.command,
    };
    axios.post(`${MQTT_URL}/send-command`, body).then((reponse) => {
      history.push("/");
    });
  };

  return (
    <div>
      <Navbar />
      <div className="main container" id="command-class">
        <h1>SEND COMMAND</h1>
        <div className="form-group">
          <label htmlFor="deviceID">Device ID</label>
          <textarea
            rows="1"
            className="form-control"
            id="deviceID"
            onChange={handleChange}
          ></textarea>
          <label htmlFor="command">Command</label>
          <textarea rows="2" className="form-control" id="command"></textarea>
          <button
            className="btn btn-success"
            id="send-command"
            onClick={handleSubmitClick}
          >
            Send
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SendCommand;
