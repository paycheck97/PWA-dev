import React from "react";
import "./dashboard.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Recetas from "./recetasuser";
import Button from "react-bootstrap/Button";
import { Typography } from "@material-ui/core";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import MenuAppBar from "./navbar";
import Title from "../img/recetas-sugeridas.png";
import axios from "axios";
import { Link } from "react-router-dom";

const styles = theme => ({});

class dashboard extends React.Component {
  state = {
    recetas: [],
    name: "",
    filters: [],
    search_recipes: [],
    porIngrediente: false
  };
  handleButtonIngrediente = () => {
    this.setState({ porIngrediente: true });
    console.log(this.state.porIngrediente);
  };
  handleButtonNombre = () => {
    this.setState({ porIngrediente: false });
    console.log(this.state.porIngrediente);
  };

  mySubmitHandler = async event => {
    const { name, filters } = this.state;

    console.log(name);
    event.preventDefault();
    try {
      const response = axios
        .post("/search-recipes", { filters, name })
        .then(res => {
          const search_recipes = res.data;
          this.setState({ search_recipes });
          console.log(this.state.search_recipes);
        });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    this.setState({ filters: this.state.filters.concat(name) });
    console.log(this.state.filters);
  };
  myChangeHandler = async event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  render() {
    const { search_recipes, porIngrediente } = this.state;
    let search;
    if (!porIngrediente) {
      search = (
        <div>
          <Form id="search" onSubmit={this.mySubmitHandler}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Choose by Name"
                onChange={this.myChangeHandler}
                name="name"
              />
            </Form.Group>
            <Button variant="light" type="submit">
              Search
            </Button>
          </Form>
        </div>
      );
    } else {
      search = (
        <div>
            <Form id="search" onSubmit={this.mySubmitHandler}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="text"
                  placeholder="Choose by Ingredient"
                  onChange={this.myChangeHandler}
                  name="name"
                />
              </Form.Group>
              <Button variant="light" type="submit">
                Search
              </Button>
            </Form>
          </div>
      )
    }

    return (
      <div className="supercontainer">
        <MenuAppBar />
        <div>
          <ButtonGroup toggle className="mt-3">
            <ToggleButton
              id="button_selected"
              type="radio"
              name="radio"
              defaultChecked
              value="1"
              onClick={this.handleButtonNombre}
            >
              Por Nombre
            </ToggleButton>
            <ToggleButton
              id="button_selected"
              type="radio"
              name="radio"
              value="2"
              onClick={this.handleButtonIngrediente}
            >
              Por Ingrediente
            </ToggleButton>
          </ButtonGroup>
        </div>
        <div className="container2">
          {search}
          <div>
            <Row>
              {search_recipes.map(search_recipe => (
                <Col lg="4" key={search_recipe.id}>
                  <div className="card">
                    <img
                      className="d-block w-100"
                      src={search_recipe.thumbnail}
                      alt={search_recipe.nombre}
                    />
                    <div className="card-body">
                      <Typography className="card-title">
                        {search_recipe.name}
                      </Typography>
                      <Typography>
                        Tiempo de preparacion {search_recipe.prep_time}
                      </Typography>
                      <Typography>
                        Calorias {search_recipe.calories_ps}
                      </Typography>
                      <Typography>Servings {search_recipe.servings}</Typography>
                      <Link to="/Info" className="btn btn-primary">
                        Learn More
                      </Link>
                      <Link to="/Info" className="btn btn-warning">
                        Favorite
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          <div className="jumbotron text-center" id="head">
            <img src={Title} alt="logo" className="img-fluid align-middle" />
          </div>
          <div id="rec">
            <Recetas />
          </div>
        </div>
      </div>
    );
  }
}
dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(dashboard);
