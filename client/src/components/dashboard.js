import React from "react";
import "./dashboard.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Recetas from "./recetasuser";
import Button from "react-bootstrap/Button";
import { Typography } from "@material-ui/core";
import Form from "react-bootstrap/Form";
import MenuAppBar from "./navbar";
import Title from "../img/recetas-sugeridas.png";
import axios from "axios";
import { Link } from "react-router-dom";

const styles = theme => ({});

class dashboard extends React.Component {
  state = {
    recetas: [],
    name: '',
    search_recipes: [],
  };
  mySubmitHandler = async event => {
    const { name } = this.state;
    console.log(name)

    try {
      const response = axios.post("/search-recipes",{name}).then(res => {
        const search_recipes = res.data;
        this.setState({ search_recipes });
        console.log(this.state.search_recipes)
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    console.log('hola');
  };
  myChangeHandler = async event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  componentDidUpdate(prevState){
    this.setState.search_recipes = this.state.search_recipes.current;
  }

  render() {
    const { search_recipes } = this.state;
    return (
      <div className="supercontainer">
        <MenuAppBar />
        {this.state.search_recipes}
        <div className="container2">
          <div>
            <Form id="search" onSubmit={this.mySubmitHandler}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="text"
                  placeholder="Choose by ingredient"
                  onChange={this.myChangeHandler}
                  name="name"
                />
              </Form.Group>
              <Button variant="light" type="submit">Search</Button>
            </Form>
          </div>
          <div>
          {search_recipes.map(search_recipe => (
                  <div className="card"key={search_recipe.id}>
                    <img
                      className="d-block w-100"
                      src={search_recipe.thumbnail}
                      alt={search_recipe.nombre}
                    />
                    <div className="card-body">
                      <Typography><h4 className="card-title">{search_recipe.name}</h4></Typography>
                      <Typography>Tiempo de preparacion {search_recipe.prep_time}</Typography>
                      <Typography>Calorias {search_recipe.calories_ps}</Typography>
                      <Typography>Servings {search_recipe.servings}</Typography>
                      <Link to="/Info" className="btn btn-primary" >
                        Learn More
                      </Link>
                      <Link className="btn btn-warning">
                        Favorite
                      </Link>
                    </div>
                  </div>
              ))}
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
