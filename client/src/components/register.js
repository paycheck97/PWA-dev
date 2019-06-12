import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  state = {
    email: '',
    name: '',
    last_name: '',
    password: '',

  }

  mySubmitHandler = async event => {
    const {
      email,
      name,
      last_name,
      password,
    } = this.state;
    try {
      const response = await axios.post("/register", {
        email,
        name,
        last_name,
        password,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    alert(this.state.nombre + this.state.metodo);
  };

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
                  placeholder="Enter Email"
                  name = "email"
                  onChange={this.myChangeHandler}
                />
              </div>
              <div className="form-group ">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter First Name"
                  name = "name"     
                  onChange={this.myChangeHandler} 
                           />
              </div>
              <div className="form-group ">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Last Name"
                  name = "last_name"
                  onChange={this.myChangeHandler}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name = "password"
                  onChange={this.myChangeHandler}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  name = "password"
                  onChange={this.myChangeHandler}
                />
              </div>
              <div className="row">
                <div className="col text-center">
                    <button className="btn text-white" id="boton" >
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
