import React, { Component } from "react";
import Header from "./header";
import LoginForm from "./loginForm";
import Footer from "./footer";

class Login extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "#fceae7",
          backgroundRepeat: "repeat",
          fontFamily: "Roboto"
        }}
      >
        <Header />
        <LoginForm />
        <Footer />
      </div>
    );
  }
}

export default Login;
