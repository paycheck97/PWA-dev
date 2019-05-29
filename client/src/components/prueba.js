import React, { Component } from "react";
import "./prueba.css";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { Typography } from "@material-ui/core";

class prueba extends Component {
  state = {
    recetas: [],
    receta_id: null
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

  getID = (id) => {
    console.log(id)
    
  }

  render() {
    const { recetas } = this.state;
    var id = null;
    return (
      <div className="container text-center my-3">
        <div className="row mx-auto my-auto">
          <div>
            <Carousel indicators={false}>
              {recetas.map(receta => (
                <Carousel.Item key={receta.id}>
                  <div className="card">
                    <img
                      className="d-block w-100"
                      src={receta.thumbnail}
                      alt={receta.nombre}
                    />
                    <div className="card-body">
                      <Typography><h4 className="card-title">{receta.name}</h4></Typography>
                      <Typography>Tiempo de preparacion {receta.prep_time}</Typography>
                      <Typography>Calorias {receta.calories_ps}</Typography>
                      <Typography>Servings {receta.servings}</Typography>
                      <Link to="/Info" className="btn btn-primary" onClick={this.getID({id})}>
                        Edit
                      </Link>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    );
  }
}

export default prueba;
