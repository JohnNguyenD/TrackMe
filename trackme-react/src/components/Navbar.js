import React from "react";
import { NavLink, useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("user");
    history.push("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" id="navbar">
        <NavLink className="navbar-brand" exact to="/">
          TrackMe
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#expanded-nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="expanded-nav">
          <div className="navbar-nav" id="main-nav">
            <NavLink className="nav-item nav-link" to="/">
              Devices
            </NavLink>
            <NavLink className="nav-item nav-link" to="/register-device">
              Register
            </NavLink>
            <NavLink className="nav-item nav-link" to="/send-command">
              Send Command
            </NavLink>
            <NavLink className="nav-item nav-link" to="/about">
              About
            </NavLink>
            <NavLink className="nav-item nav-link" to="/registration">
              Sign Up
            </NavLink>
            {localStorage.getItem("user") ? (
              <a className="nav-item nav-link" onClick={handleLogout}>
                Logout
              </a>
            ) : (
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
