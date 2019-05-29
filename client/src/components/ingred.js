import React, { Component } from "react";
import "./edit.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MenuAppBar from "./navbar";

class edit extends Component {
  state = {
    ingredientes: []
  }

  componentDidMount() {
    fetch("/ingredients")
      .then(res => res.json())
      .then(ingredientes =>
        this.setState({ ingredientes }, () =>
          console.log("Fetch realizado", ingredientes)
        )
      );
  }

  render() {
    const { ingredientes } = this.state;
    return (
      <div>
          <MenuAppBar />
          <h1>
              Agregar Ingrediente
          </h1>
        <div id={"form"}>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label><h3>Nombre Ingrediente</h3></Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label><h3>Datos Nutricionales</h3></Form.Label>
              <Form.Control as="textarea" rows="6" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label><h3>Tags</h3></Form.Label>
              <Form.Control as="select" multiple>
                <option>Vegana</option>
                <option>Vegetariana</option>
                <option>No Gluten</option>
                <option>Meat Lovers</option>
              </Form.Control>
            </Form.Group>
            <Button variant="secondary" size="lg" block>Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default edit;