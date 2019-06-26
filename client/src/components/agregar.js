import React, { Component } from "react";
import "./edit.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MenuAppBar from "./navbar_admin";
import axios from "axios";
import jwt_decode from 'jwt-decode';

class edit extends Component {
  state = {
    ingredientes: [],
    name: "",
    ingre_selec: [],
    instructions: "",
    prep_time: "",
    servings: "",
    calories_ps: "",
    thumbnail: "",
    author: "",
  };
  mySubmitHandler = async event => {
    const {
      name,
      instructions,
      prep_time,
      servings,
      calories_ps,
      thumbnail, 
      author
    } = this.state;
    try {
      const response = await axios.post("/add-recipe", {
        name,
        instructions,
        prep_time,
        servings,
        calories_ps,
        thumbnail, 
        author
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    alert(this.state.nombre + this.state.metodo);
  };
  myChangeHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  componentDidMount() {
    const token = localStorage.userToken;
    const decode = jwt_decode(token);
    const name = decode.name;
    const last_name = decode.last_name;
    const author = name + " " + last_name;
    fetch("/ingredients")
      .then(res => res.json())
      .then(ingredientes =>
        this.setState({ 
          ingredientes,
          author,
        }, () =>
          console.log("Fetch realizado", ingredientes),
          console.log("Fetch realizado", last_name),
          console.log("Fetch realizado", author)
        )
      );
  }

  render() {
    const { ingredientes } = this.state;
    return (
      <div>
        <MenuAppBar />
        <h1>Agregar Recetas</h1>
        <div id={"form"}>
          <Form onSubmit={this.mySubmitHandler}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>
                <h3>{this.state.nombre}</h3>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={"Nombre Receta"}
                onChange={this.myChangeHandler}
                name="name"
              />
            </Form.Group>
            <Form.Label>
              <h3>Ingredientes</h3>
            </Form.Label>
            {this.state.ingre_selec}
            <Form.Group controlId="exampleForm.ControlSelect1">
              {ingredientes.map(ingrediente => (
                <Form.Check
                  inline
                  label={ingrediente.name}
                  key={ingrediente.id}
                  onChange={this.myChangeHandler}
                  value={ingrediente.name}
                  name="ingre_select"
                />
              ))}
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>
                <h3>Metodo de preparacion</h3>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows="6"
                name="instructions"
                onChange={this.myChangeHandler}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder={"Tiempo de Preparacion"}
                onChange={this.myChangeHandler}
                name="prep_time"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="number"
                placeholder={"Porciones"}
                onChange={this.myChangeHandler}
                name="servings"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="number"
                placeholder={"Calorias"}
                onChange={this.myChangeHandler}
                name="calories_ps"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder={"Foto URL"}
                onChange={this.myChangeHandler}
                name="thumbnail"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>
                <h3>Tags</h3>
              </Form.Label>
              <Form.Control as="select" multiple>
                <option>Vegana</option>
                <option>Vegetariana</option>
                <option>No Gluten</option>
                <option>Meat Lovers</option>
              </Form.Control>
            </Form.Group>
            <Button variant="secondary" size="lg" block type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default edit;
