import React, { Component } from "react";
import Header from "./header";
import LoginForm from "./loginForm";
import Footer from "./footer";
import Register from "./register";

class Login extends Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);

    this.state = {
      view: 0
    };
  }

  buttonStyles = {
    backgroundColor: "#874d63",
    width: "250px",
    borderRadius: "40px"
  };

  loginView = () => {
    this.setState({
      view: 1
    });
  };

  regView = () => {
    this.setState({
      view: 2
    });
  };
  handler = () => {
    this.setState({
      view: 0
    });
  };

  render() {
    const { view } = this.state;
    switch (view) {
      case 0:
        return (
          <>
            <Header />
            <div className="container">
              <div className="row">
                <div className="col text-center">
                  <button
                    onClick={this.loginView}
                    className="btn text-white"
                    style={this.buttonStyles}
                  >
                    Login
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col text-center">
                  <button
                    onClick={this.regView}
                    className="btn text-white"
                    style={this.buttonStyles}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
            <Footer />
          </>
        );
      case 1:
        return (
          <>
            <Header />
            <LoginForm action={this.handler} />
            <Footer />
          </>
        );
      case 2:
        return (
          <>
            <Header />
            <Register action={this.handler} />
            <Footer />
          </>
        );
    }
  }
}

export default Login;
