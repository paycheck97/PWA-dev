import React, { Component } from "react";
import "./info.css";
import MenuAppBar from "../components/navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
//import Info2 from "../components/InfoCard";
//import axios from 'axios';

import Card from "react-bootstrap/Card";

class Info extends Component {
  state = {
    recetas: [],
    receta_id: null,
    expanded: false,
    rating: null
  };

  mySubmitHandler = async event => {
    const { rating } = this.state;
    event.preventDefault();
    try {
      const response = axios
        .post(`/change-rating/${this.props.match.params.id}`, { rating })
        .then(res => {
          alert("Rating actualizado");
        });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  myChangeHandler = async event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val }, () => {
      console.log(this.state.rating);
    });
  };

  componentDidMount() {
    fetch(`/view-recipe/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(recetas =>
        this.setState({ recetas }, () =>
          console.log("Fetch realizado", recetas)
        )
      );
  }
  render() {
    const { recetas } = this.state;
    return (
      <div className="justify-content-md-center" >
        <MenuAppBar />
        {recetas.map(receta => (
          <Card id="carta_info" >
            <Card.Img variant="top" src={receta.thumbnail} />
            <Card.Body>
              <Card.Title>{receta.name}</Card.Title>
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
                    Search
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
