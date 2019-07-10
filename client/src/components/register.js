import React, { Component } from "react";
import axios from "axios";
import "./register.css";

/**
 * Registrar nuevo Usuario.
 * @visibleName Register
 */

class Register extends Component {
  state = {
    email: "",
    name: "",
    last_name: "",
    password: "",
    answer: ""
  };

  mySubmitHandler = async event => {
    const { email, name, last_name, password, answer } = this.state;
    event.preventDefault();
    try {
      const response = await axios.post("/register", {
        email,
        name,
        last_name,
        password,
        answer
      });
      console.log(response);
      alert(response.data);
    } catch (err) {
      console.log(err);
      alert("Parece hubo un problema con el servidor");
    }
  };

  myChangeHandler = async event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  render() {
    return (
      <div className="container" id="registerCont">
        <div className="row justify-content-center">
          <div className="col-10">
            <form onSubmit={this.mySubmitHandler}>
              <div className="form-group ">
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Email"
                  name="email"
                  onChange={this.myChangeHandler}
                />
              </div>
              <div className="form-group ">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter First Name"
                  name="name"
                  onChange={this.myChangeHandler}
                />
              </div>
              <div className="form-group ">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Last Name"
                  name="last_name"
                  onChange={this.myChangeHandler}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre de tu primera mascota"
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
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  name="password"
                  onChange={this.myChangeHandler}
                />
              </div>
              <div className="row">
                <div className="col text-center">
                  <button className="btn text-white" id="boton">
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col text-center">
            <small className="text-center" onClick={this.props.action}>
              Go Back
            </small>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
