import React from "react";
import logo from "../img/logo.png";
import "./header.css";

function Header() {
  return (
    <div className="banner">
      <img className="logo" src={logo} alt={'lala'} />
    </div>
  );
}

export default Header;
