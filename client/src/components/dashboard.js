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
import Alert from "react-bootstrap/Alert";
import ToggleButton from "react-bootstrap/ToggleButton";
import MenuAppBar from "./navbar";
import Title from "../img/recetas-sugeridas.png";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
//import Bin from '../img/bin-2.png'

const styles = theme => ({});

/**
 * Vista principal de los usuarios.
 * @visibleName Dashboard
 */

class dashboard extends React.Component {
  state = {
    recetas: [],
    name: "",
    rating: null,
    filters: [],
    search_recipes: [],

    porFiltro: 1,
    ingredients: []
  };

  /**
   * Cambia tipo de filtro a por Ingrediente.
   *
   * @param {event} click
   * @public
   */
  handleButtonIngrediente = () => {
    this.setState({ porFiltro: 2 });
    console.log(this.state.porFiltro);
  };
  /**
   * Cambia tipo de filtro a por Nombre.
   *
   * @param {event} click
   * @public
   */
  handleButtonNombre = () => {
    this.setState({ porFiltro: 1 });
    console.log(this.state.porFiltro);
  };
  /**
   * Cambia tipo de filtro a por Rating.
   *
   * @param {event} click
   * @public
   */
  handleButtonRating = () => {
    this.setState({ porFiltro: 3 });
    console.log(this.state.porFiltro);
  };

  /**
   * Quitar ingredientes del filtro.
   *
   * @param {event} event
   * @public
   */

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

  /**
   * Submit de la busqueda.
   *
   * @param {event} click
   * @public
   */

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
    } else {
      alert("Ingrese un nombre antes");
    }
  };

  /**
   * Submit del filtro por rating.
   *
   * @param {event} click
   * @public
   */
  mySubmitHandlerRating = async event => {
    const { rating } = this.state;
    console.log(rating);
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      try {
        const response = axios
          .post("/search-recipes-val", { rating })
          .then(res => {
            const search_recipes = res.data;
            this.setState({ search_recipes });
            console.log(this.state.search_recipes);
          });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Ingrese un rating antes");
    }
  };
  /**
   * Submit del filtro por ingrediente.
   *
   * @param {event} click
   * @public
   */
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
    console.log(nam);
    console.log(val);
  };

  componentDidMount = event => {
    const token = localStorage.userToken;
    if (token != null) {
      this.setState({ show: true });
    }
    try {
      axios
        .get("/ingredients")
        .then(res => {
          const ingredients = res.data;
          this.setState({ ingredients });
        })
        .catch(e => console.log(e));
    } catch (e) {
      alert(e);
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      search_recipes,
      porFiltro,
      filters,
      ingredients,
      show
    } = this.state;

    let search;
    if (porFiltro === 3) {
      search = (
        <div>
          <Form id="search" onSubmit={this.mySubmitHandlerRating} noValidate>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="number"
                placeholder="Choose by Rating (1-5)"
                onChange={this.myChangeHandler}
                name="rating"
                required
              />
            </Form.Group>
            <Button variant="light" type="submit">
              Search
            </Button>
          </Form>
        </div>
      );
    } else if (porFiltro === 1) {
      search = (
        <div>
          <Form id="search" onSubmit={this.mySubmitHandler} noValidate>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Choose by Name"
                onChange={this.myChangeHandler}
                name="name"
                required
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
    let body;
    if (show === true) {
      body = (
        <>
          <div>
            <MenuAppBar />
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
              <ToggleButton
                id="button_selected"
                type="radio"
                name="radio"
                value="3"
                onClick={this.handleButtonRating}
              >
                Por Rating
              </ToggleButton>
            </ButtonGroup>
          </div>
          <div className="container2">
            <div className="container2">
              {search}
              <div>
                <Row>
                  {search_recipes.map(search_recipe => (
                    <Col lg={4} key={search_recipe.id}>
                      <div
                        className="card my-3"
                        style={{ width: "85%", margin: "auto" }}
                      >
                        <img
                          className="d-block w-100"
                          src={search_recipe.thumbnail}
                          alt={search_recipe.nombre}
                        />
                        <div className="card-body">
                          <Typography className="card-title" variant="h4">
                            {search_recipe.name}
                          </Typography>
                          <Typography>
                            Tiempo de preparacion {search_recipe.prep_time}
                          </Typography>
                          <Typography>
                            Calorias {search_recipe.calories_ps}
                          </Typography>
                          <Typography>
                            Servings {search_recipe.servings}
                          </Typography>
                          <Row className="justify-content-md-center d-flex flex-column my-3">
                            <Rater
                              total={5}
                              rating={search_recipe.rating}
                              interactive={false}
                            />
                          </Row>
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
                <img
                  src={Title}
                  alt="logo"
                  className="img-fluid align-middle"
                />
              </div>
              <div id="rec">
                <Recetas />
              </div>
            </div>
          </div>
        </>
      );
    } else {
      body = (
        <Alert variant="light" className="col-md-4 p-4 mx-auto my-auto">
          <Alert.Heading>¡Vaya! parece que hubo un error</Alert.Heading>
          <p>
            Intenta ingresar a tu usuario desde aqui para poder visualizar esta
            pagina. Te dejamos el link
            <Alert.Link>
              <Link to="/"> por aqui.</Link>
            </Alert.Link>
          </p>
          <hr />
          <p className="mb-0">
            Si todavia no lo haces acuerdate de registrarte!
          </p>
        </Alert>
      );
    }

    return <div className="supercontainer">{body}</div>;
  }
}
dashboard.propTypes = {
  /**
   * A prop that should not be visible in the documentation.
   *
   * @ignore
   */
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(dashboard));
