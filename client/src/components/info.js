import React, { Component } from "react";
import "./info.css";
import MenuAppBar from "../components/navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import jwt_decode from "jwt-decode";
//import Info2 from "../components/InfoCard";
//import axios from 'axios';

import Card from "react-bootstrap/Card";

/**
 * Muestra la informacion de la receta seleccionada.
 * @visibleName User/Info
 */

class Info extends Component {
  state = {
    recetas: [],
    receta_id: null,
    expanded: false,
    rating: null,
    ingredients: [],
    userID: null
  };

  /**
   * Submit del rating del usuario.
   *
   * @param {event} click
   * @public
   */
  mySubmitHandler = async event => {
    event.preventDefault();
    const { rating, userID } = this.state;

    try {
      console.log(this.props.match.params.id)
      const response = axios
        .post(`/change-rating/${this.props.match.params.id}`, {
          rating,
          userID
        })
        .then(res => {
          console.log("hola");
          alert("Rating actualizado");
        });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Maneja los cambios en los inputs.
   *
   * @param {event} click
   * @public
   */

  myChangeHandler = async event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val }, () => {
      console.log(this.state.rating);
    });
  };

  componentDidMount() {
    const token = localStorage.userToken;
    if (token != null) {
      const decode = jwt_decode(token);

      this.setState({ userID: decode.id });
    }
    fetch(`/view-recipe/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(recetas =>
        this.setState({ recetas }, () =>
          console.log("Fetch realizado", recetas)
        )
      );
    fetch(`/look-ingre/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(ingredients =>
        this.setState({ ingredients }, () =>
          console.log("Fetch realizado", ingredients)
        )
      );
  }
  render() {
    const { recetas, ingredients } = this.state;
    return (
      <div>
        <MenuAppBar />
        {recetas.map(receta => (
          <Card id="carta_info">
            <Card.Img variant="top" src={receta.thumbnail} />
            <Card.Body>
              <Card.Title>{receta.name}</Card.Title>
              <Card.Title>{receta.author}</Card.Title>
              <Card.Title>Ingredientes</Card.Title>
              <Card.Text>
                {ingredients.map(ingredient => (
                  <span>• {ingredient.name} </span>
                ))}
              </Card.Text>
              <Card.Title>Instrucciones</Card.Title>
              <Card.Text>{receta.instructions}</Card.Text>
              <div>
                <Form id="search" onSubmit={this.mySubmitHandler}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                      type="number"
                      onChange={this.myChangeHandler}
                      name="rating"
                      as="select"
                    >
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Form.Group>
                  <Button variant="light" type="submit">
                    Valora
                  </Button>
                </Form>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default Info;
