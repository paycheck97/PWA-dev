import React, { Component } from "react";
import "./loginForm.css";
import {NavLink} from 'react-router-dom';

class LoginForm extends Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10">
            <form>
              <div className="form-group ">
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <NavLink to="/Dashboard"><button className="btn text-white" id="boton">Login</button></NavLink>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <small className="text-center">Forggot Password?</small>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
