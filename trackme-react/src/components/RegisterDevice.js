import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useHistory } from "react-router-dom";

const API_URL = "https://trackme-ashy.vercel.app/api";

const RegisterDevice = () => {
  const [state, setState] = useState({
    user: "",
    name: "",
  });

  const history = useHistory();

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
      name: state.name,
      user: state.user,
    };
    axios.post(`${API_URL}/devices`, body).then((response) => {
      history.push("/");
    });
  };

  return (
    <div>
      <Navbar />
      <div className="main container" id="command-class">
        <h1>REGISTERED NEW DEVICE</h1>
        <div className="form-group">
          <label htmlFor="user">User</label>
          <input
            type="text"
            className="form-control"
            id="user"
            value={state.user}
            onChange={handleChange}
          />

          <label htmlFor="name">Device Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={state.name}
            onChange={handleChange}
          />

          <button
            className="btn btn-success"
            id="add-device"
            onClick={handleSubmitClick}
          >
            Save
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterDevice;
