import React, { Component } from "react";
import Header from "./Header";
import LoginForm from "./loginForm";
import Footer from "./footer";
import Register from "./register";
import Modal from "react-bootstrap/Modal";
import {Typography} from "@material-ui/core";
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handler = this.handler.bind(this);

    this.state = {
      show: false,
      view: null,
      email: "",
      password: "",
      answer: "",
        };
  }

  mySubmitHandler = async event => {
    const { email, password, answer} = this.state;
    event.preventDefault();
    try {
      axios
        .post("/change-password", { email, password, answer })
        .then(res => {
          if(res.data === true){
            this.handleClose();
            alert('Cambio de contraseña exitoso.');
          }else{
            this.handleClose();
            alert('Cambio de contraseña fallido.')
          }

        });
    } catch (err) {
      console.log(err);
    }
  };

  myChangeHandler = async event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
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
      view: null
    });
  };

  render() {
    const { view } = this.state;
    switch (view) {
      default:
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
              <div className="row">
                <div className="col text-center">
                  <small className="text-center" onClick={this.handleShow}>
                    Forgot Password?
                  </small>
                </div>
              </div>

              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Password Change</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Typography>Ingrese su correo electrónico y su respuesta secreta junto con
                  su nueva clave de acceso.</Typography>
                  <form onSubmit={this.mySubmitHandler}>
                    <div className="form-group ">
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter email"
                        name="email"
                        onChange={this.myChangeHandler}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Pregunta secreta"
                        name="answer"
                        onChange={this.myChangeHandler}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={this.myChangeHandler}
                      />
                    </div>
                    <div className="row">
                      <div className="col text-center">
                        <button
                          className="btn text-white"
                          id="boton"
                          type="submit"
                        >
                          Aceptar
                        </button>
                      </div>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
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
