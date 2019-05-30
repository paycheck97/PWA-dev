
import React from "react";
import "./dashboard.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Recetas from "./recetasuser";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MenuAppBar from "./navbar";
import Title from "../img/recetas-sugeridas.png";

const styles = theme => ({
 
});

class dashboard extends React.Component {
  
    state = {
    recetas: []
    }

  render() {
    //const {ejemplos} = this.state;
   // console.log(ejemplos)
    return (

      <div className="supercontainer">
        <MenuAppBar />
        
        <div className="container2">
          <div>
          {/*<ul>
          {ejemplos.map(ejemplos => 
            <li key={ejemplos.id_ciudad}>{ejemplos.nombre_ciudad}</li>
          )}
          </ul>*/}
          </div>
          <div>
            <div id="search">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control type="email" placeholder="Choose by ingredient" />
              </Form.Group>
              <Button variant="light">Search</Button>
            </div>
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
