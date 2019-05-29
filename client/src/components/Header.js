import React, { Component } from "react";
import logo from "../img/logo-maroon.png";
import "./header.css";

class Header extends Component {
  render() {
    return (
      <div className="jumbotron text-center">
        <img src={logo} alt="logo" className="img-fluid align-middle" />
      </div>
    );
  }
}

export default Header;
