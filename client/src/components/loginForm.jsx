import React, { Component } from "react";
import "./loginForm.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";

/**
 * Campos del form en el componente Login.
 * @visibleName Login/LoginForm
 */

class LoginForm extends Component {
  state = {
    password: "",
    email: ""
  };

  /**
   * Maneja el submit de los datos.
   *
   * @param {event} click
   * @public
   */
  mySubmitHandler = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const response = await axios.post("/login", {
        email,
        password
      });
      if (response.data.length > 0) {
        const token = jwt_decode(response.data);
        localStorage.setItem("userToken", response.data);
        if (token.state === 1) {
          this.props.history.push("/Admin");
        } else {
          this.props.history.push("/Dashboard");
        }
      } else {
        alert("Incorrect User or Password");
      }
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Maneja cambios en los inputs.
   *
   * @param {event} click
   * @public
   */
  myChangeHandler = async event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10">
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
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  onChange={this.myChangeHandler}
                />
              </div>
              <div className="row">
                <div className="col text-center">
                  <button className="btn text-white" id="boton" type="submit">
                    Login
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

export default withRouter(LoginForm);
