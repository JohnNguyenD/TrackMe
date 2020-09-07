import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import NavBar from "./components/Navbar";
import AboutMe from "./components/AboutMe";
import DeviceList from "./components/DeviceList";
import RegisterDevice from "./components/RegisterDevice";
import Registration from "./components/Registration";
import SendCommand from "./components/SendCommand";
import Login from "./components/Login";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Route exact path="/" render={() => <DeviceList />} />
        <Route path="/register-device" render={() => <RegisterDevice />} />
        <Route path="/send-command" render={() => <SendCommand />} />
        <Route path="/about" render={() => <AboutMe />} />
        <Route path="/registration" render={() => <Registration />} />
        <Route path="/login" render={() => <Login />} />
      </BrowserRouter>
    </div>
  );
};

export default App;
