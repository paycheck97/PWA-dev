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
import Chip from "@material-ui/core/Chip";
//import Bin from '../img/bin-2.png'

const styles = theme => ({});

class dashboard extends React.Component {
  state = {
    recetas: [],
    name: "",
    filters: [],
    search_recipes: [],
    porIngrediente: true,
    ingredients: []
  };
  handleButtonIngrediente = () => {
    this.setState({ porIngrediente: true });
    console.log(this.state.porIngrediente);
  };
  handleButtonNombre = () => {
    this.setState({ porIngrediente: false });
    console.log(this.state.porIngrediente);
  };

  removeFilter = filter => {
    var { filters } = this.state;
    console.log("entre");
    console.log(filter);
    this.setState(filters.splice(this.state.filters.indexOf(filter), 1), () => {
      console.log(this.state.filters);
      filters = this.state.filters;
      try {
        const response = axios
          .post("/search-recipes-i", { filters })
          .then(res => {
            const search_recipes = res.data;
            this.setState({ search_recipes });
            console.log(this.state.search_recipes);
          });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    });
  };

  mySubmitHandler = async event => {
    const { name } = this.state;
    console.log(name);
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
    try {
          const response = axios.post("/search-recipes", { name }).then(res => {
            const search_recipes = res.data;
            this.setState({ search_recipes });
            console.log(this.state.search_recipes);
          });
          console.log(response);
        } catch (err) {
          console.log(err);
        }
    }else{
      alert('Ingrese un nombre antes');
    }
    
  };
  mySubmitHandler_ingr = async event => {
    var { filters, name } = this.state;
    var check = true;
    event.preventDefault();
    // eslint-disable-next-line array-callback-return
    filters.map(filter => {
      if (filter === name) {
        check = false;
      }
    });
    if (check === true) {
      this.setState({ filters: this.state.filters.concat(name) }, () => {
        filters = this.state.filters;
        try {
          const response = axios
            .post("/search-recipes-i", { filters })
            .then(res => {
              const search_recipes = res.data;
              this.setState({ search_recipes });
              console.log(this.state.search_recipes);
            });
          console.log(response);
        } catch (err) {
          console.log(err);
        }
      });
    }
  };
  myChangeHandler = async event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  componentDidMount = event => {
    try {
      fetch("/ingredients")
        .then(res => res.json())
        .then(ingredients => this.setState({ ingredients }, () => {
            console.log("Fetch realizado", ingredients)
        }));
    } catch (e) {
      alert(e);
    }
  };

  render() {
    const { search_recipes, porIngrediente, filters, ingredients } = this.state;
    let search;
    if (!porIngrediente) {
      search = (
        <div>
          <Form id="search" onSubmit={this.mySubmitHandler} noValidate>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Choose by Name"
                onChange={this.myChangeHandler}
                name="name" required
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
        <div className=" my-3">
          {filters.map(filter => (
            <Chip
              label={filter}
              key={filter}
              onDelete={() => this.removeFilter({ filter })}
            />
          ))}
          <Form id="search" onSubmit={this.mySubmitHandler_ingr}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                onChange={this.myChangeHandler}
                name="name"
                as="select"
              >
                {ingredients.map(ingredient => (
                  <option key={ingredient.id}>{ingredient.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="light" type="submit">
              Search
            </Button>
          </Form>
        </div>
      );
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
                <Col lg={4} key={search_recipe.id}>
                  <div className="card my-3" style={{ width: "90%", margin: 'auto' }}>
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
                      <Link
                        to={`Info/${search_recipe.id}`}
                        className="btn btn-primary"
                      >
                        Learn More
                      </Link>
                      <Link
                        to={`Info/${search_recipe.id}`}
                        className="btn btn-warning"
                      >
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
