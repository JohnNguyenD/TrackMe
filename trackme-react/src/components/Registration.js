import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Login from "./Login";
import axios from "axios";

const API_URL = "https://trackme-ashy.vercel.app/api";
const Registration = () => {
  const [state, setState] = useState({
    UserName: "",
    Password: "",
    rePassword: "",
  });
  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    setMessage("");
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.Password === state.rePassword) {
      axios
        .post(`${API_URL}/registration`, {
          name: state.UserName,
          password: state.Password,
        })
        .then(({ data }) => {
          if (data.success) {
            history.push("/login");
          } else {
            setMessage("Username has already existed");
          }
        });
    } else {
      setMessage("Password doesnt match !!");
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Registration form</h1>
      <form>
        <div className="form-group">
          <label htmlFor="userName">User name</label>
          <input
            type="text"
            className="form-control"
            id="UserName"
            placeholder="Enter User name"
            value={state.userName}
            onChange={handleChange}
            required
          />
          <div id="message"></div>
        </div>
        <div className="form-group">
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            className="form-control"
            id="Password"
            placeholder="Enter Password"
            value={state.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="re-Password">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="rePassword"
            placeholder="Re-enter Password"
            value={state.rePassword}
            onChange={handleChange}
            required
          />
        </div>
        <p id="error-message">{message}</p>
        <button
          type="submit"
          className="btn btn-primary"
          id="add-user"
          onClick={handleSubmitClick}
        >
          Register
        </button>
        <p className="firstP">
          Already have an account? Login <NavLink to="/login">here</NavLink>
        </p>
      </form>
      <Footer />
    </div>
  );
};

export default Registration;
