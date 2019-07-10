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
    recetas: []
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
    return (
      <div className="supercontainer">
        <MenuAppBar />
        <div className="jumbotron text-center" id="head">
          <img src={Title} alt="logo" className="img-fluid align-middle" />
        </div>
        <div className="container2">
          <div>
            <div id="search">
              <Form className="pure-form">
                <Form.Control placeholder="Look up" />
              </Form>
              <Button type="submit" className="btn btn-secondary">
                Search
              </Button>
            </div>
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
