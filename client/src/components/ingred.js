import React, { Component } from "react";
import "./ingred.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MenuAppBar from "./navbar_admin";
import axios from "axios";
import Title from "../img/agregar-ingredientes.png";
/**
 * Vista para agregar ingredientes.
 * @visibleName Admin/AddIngrediente
 */

class edit extends Component {
  state = {
    name: ""
  };

  /**
   * Maneja el submit de los ingredientes a agregar.
   *
   * @param {event} click
   * @public
   */

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
  /**
   * Maneja cambios en los inputs.
   *
   * @param {event} click
   * @public
   */
  myChangeHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  render() {
    return (
      <div>
        <MenuAppBar />
        <div className="jumbotron text-center" id="head">
          <img src={Title} alt="logo" className="img-fluid align-middle" />
        </div>
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
            <Button variant="secondary" size="md" type="submit" id="boton_in">
              Agregar
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default edit;
