import React, { Component } from "react";
import "./admin.css";
import PropTypes from "prop-types";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import Recetas from "./prueba";
import Title from "../img/Admin.png";
import subTitle from "../img/Recetas.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import MenuAppBar from "./navbar_admin";
import axios from "axios";
import { Typography } from "@material-ui/core";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    },
    input: {
      marginLeft: 8,
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    Paper: {
      width: 10
    }
  }
});
/**
 * Esta de lapagina principal de los administradores.
 * @visibleName Administrador
 */

class admin extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    recetas: [],
    search_recipes: []
  };

  componentDidMount() {
    fetch("/Recipes")
      .then(res => res.json())
      .then(recetas =>
        this.setState({ recetas }, () =>
          console.log("Fetch realizado", recetas)
        )
      );
  }

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

  myChangeHandler = async event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
    console.log(nam);
    console.log(val);
  };

  /**
   * Abrir dropdown del navbar.
   *
   * @param {event} click
   * @public
   */
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  /**
   * Cerrar dropdown.
   *
   *
   * @public
   */
  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  /**
   * Abrir dropdown del navbar (Mobil).
   *
   * @param {event} click
   * @public
   */
  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  /**
   * Cerrar dropdown del navbar (Mobil).
   *
   *
   * @public
   */
  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  /**
   * Get id de usuario.
   *
   * @param {int} id
   * @public
   */
  getID = id => {
    console.log(id);
  };

  render() {
    const { search_recipes } = this.state;
    return (
      <div className="supercontainer">
        <MenuAppBar />
        <div className="jumbotron text-center" id="head">
          <img src={Title} alt="logo" className="img-fluid align-middle" />
        </div>
        <div className="container2">
          <div>
            <div id="search">
              <Form className="pure-form" onSubmit={this.mySubmitHandler}>
                <Form.Control
                  placeholder="Introduce un nombre"
                  name="name"
                  onChange={this.myChangeHandler}
                />

                <Button type="submit" className="btn btn-secondary my-3">
                  Buscar
                </Button>
              </Form>
            </div>
          </div>
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
                      <Typography className="card-title my-3" variant="h4">
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
                        to={`Edit/${search_recipe.id}`}
                        className="btn btn-primary my-3"
                      >
                        Editar
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          <div className="jumbotron text-center" id="head">
            <img src={subTitle} alt="logo" className="img-fluid align-middle" />
          </div>
          <div id="rec">
            <Recetas />
          </div>
        </div>
      </div>
    );
  }
}
admin.propTypes = {
  /**
   * A prop that should not be visible in the documentation.
   *
   * @ignore
   */
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(admin);
