import React, { Component } from "react";
import "./edit.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
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
        <h1>
              Editar Recetas
          </h1>
        <div id={"form"}>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label><h3>Nombre Receta</h3></Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Label><h3>Ingredientes</h3></Form.Label>
            <Form.Group controlId="exampleForm.ControlSelect1">
              {ingredientes.map(ingrediente => 
                <Form.Check inline label={ingrediente.name} key={ingrediente.id} />
              )}
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label><h3>Metodo de preparacion</h3></Form.Label>
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
