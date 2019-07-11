import React, { Component } from "react";
import "./edit.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MenuAppBar from "./navbar_admin";
import axios from "axios";
import Title from "../img/editar-receta.png";

/**
 * Esta vista es para Editar Recetas.
 * @visibleName Admin/Editar
 */

class edit extends Component {
  state = {
    recetas: [],
    receta_id: null,
    name: "",
    instructions: "",
    prep_time: "",
    servings: "",
    calories_ps: "",
    thumbnail: ""
  };
  /**
   * Maneja el submit de los datos editados.
   *
   * @param {event} click
   * @public
   */
  mySubmitHandler = async event => {
    const {
      name,
      instructions,
      prep_time,
      servings,
      calories_ps,
      thumbnail
    } = this.state;
    try {
      const response = await axios.post(
        `/update-recipe/${this.props.match.params.id}`,
        {
          name,
          instructions,
          prep_time,
          servings,
          calories_ps,
          thumbnail
        }
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }
    alert(this.state.nombre + this.state.metodo);
  };

  golazoCR7siuuuuuHandler = async event => {
    try {
      const response = await axios.post(
        `/delete-recipe/${this.props.match.params.id}`,
        {}
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }
    alert(this.state.nombre + this.state.metodo);
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
      <div>
        <MenuAppBar />
        <div className="jumbotron text-center" id="head">
          <img src={Title} alt="logo" className="img-fluid align-middle" />
        </div>
        <div id={"form"}>
          {recetas.map(receta => (
            <div>
              <Form onSubmit={this.mySubmitHandler}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>
                    <h3>Nombre Receta</h3>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={receta.name}
                    name="name"
                    onChange={this.myChangeHandler}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>
                    <h3>Metodo de preparacion</h3>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="6"
                    defaultValue={receta.instructions}
                    name="instructions"
                    onChange={this.myChangeHandler}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>
                    <h3>Tiempo de preparacion</h3>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={receta.prep_time}
                    onChange={this.myChangeHandler}
                    name="prep_time"
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>
                    <h3>Porciones</h3>
                  </Form.Label>
                  <Form.Control
                    defaultValue={receta.servings}
                    type="number"
                    onChange={this.myChangeHandler}
                    name="servings"
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>
                    <h3>Calorias</h3>
                  </Form.Label>
                  <Form.Control
                    defaultValue={receta.calories_ps}
                    type="number"
                    onChange={this.myChangeHandler}
                    name="calories_ps"
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>
                    <h3>Foto</h3>
                  </Form.Label>
                  <Form.Control
                    defaultValue={receta.thumbnail}
                    type="text"
                    onChange={this.myChangeHandler}
                    name="thumbnail"
                  />
                </Form.Group>
                <Button variant="secondary" size="lg" block type="submit">
                  Submit
                </Button>
              </Form>
              <Form onSubmit={this.golazoCR7siuuuuuHandler}>
                <Button variant="danger" size="lg" block type="submit">
                  Delete
                </Button>
              </Form>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default edit;
