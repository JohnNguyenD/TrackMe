import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Registration from "./Registration";
import axios from "axios";

const API_URL = "https://trackme-ashy.vercel.app/api";

const Login = () => {
  const [state, setState] = useState({
    UserNameLogin: "",
    PasswordLogin: "",
  });

  const [message, setMessage] = useState("");
  // const[loginState, setLoginState] = useState(false);

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
    axios
      .post(`${API_URL}/authenticate`, {
        name: state.UserNameLogin,
        password: state.PasswordLogin,
      })
      .then(({ data }) => {
        if (data.success) {
          // setLoginState(true);
          localStorage.setItem("user", state.UserNameLogin);
          history.push("/");
        } else {
          setMessage("Username or Password is incorrect");
        }
      });
  };

  return (
    <div>
      <Navbar />
      <h1>Login</h1>
      <form>
        <div className="form-group">
          <label htmlFor="UserName">User name</label>
          <input
            type="text"
            className="form-control"
            id="UserNameLogin"
            placeholder="Enter User name"
            value={state.UserNameLogin}
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
            id="PasswordLogin"
            placeholder="Enter Password"
            value={state.PasswordLogin}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          id="login"
          onClick={handleSubmitClick}
        >
          Login
        </button>
        <p className="firstP">
          Don't have an account? <NavLink to="/registration">Sign up</NavLink>
        </p>
        <div id="error-message">{message}</div>
      </form>
      <Footer />
    </div>
  );
};

export default Login;
