
import React from "react";
import "./dashboard.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Recetas from "./prueba";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MenuAppBar from "./navbar";

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
          <h2>SOUS-CHEFF</h2>
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
          <h1> Recetas Sugeridas </h1>
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
