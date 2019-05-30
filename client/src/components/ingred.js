import React, { Component } from "react";
import "./ingred.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MenuAppBar from "./navbar_admin";
import axios from "axios";

class edit extends Component {
  state = {
    name: "",
  };

  mySubmitHandler = async event => {
    const { name } = this.state;
    try {
      const response = await axios.post("/add-ingredient", {
        name
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  myChangeHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  render() {
    return (
      <div>
        <MenuAppBar />
        <h1>Agregar Ingrediente</h1>
        <div id="form">
          <Form onSubmit={this.mySubmitHandler}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder={"Nombre Ingrediente"}
                onChange={this.myChangeHandler}
                name="name"
              />
            </Form.Group>
            <Button variant="secondary" size="md" type="submit" id='boton_in'>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default edit;
