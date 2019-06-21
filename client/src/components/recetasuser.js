import React, { Component } from "react";
import "./recetasuser.css";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import { Typography } from "@material-ui/core";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";

class prueba extends Component {
  state = {
    recetas: [],
    receta_id: null,
    rating: null
  };

  componentDidMount = event => {
    try {
      fetch("/recipes")
        .then(res => res.json())
        .then(recetas =>
          this.setState({ recetas }, () =>
            console.log("Fetch realizado", recetas)
          )
        );
    } catch (e) {
      alert(e);
    }
  };

  render() {
    const { recetas } = this.state;
    return (
      <div className="container text-center">
        <div className="row mx-auto my-auto">
          <div className="col text-center">
            <Carousel indicators={false}>
              {recetas.map(receta => (
                <Carousel.Item key={receta.id}>
                  <div className="card shadow-md">
                    <img
                      className="d-block w-100"
                      src={receta.thumbnail}
                      alt={receta.nombre}
                    />
                    <div className="card-body justify-content-md-center">
                      <Typography variant="h4">{receta.name}</Typography>
                      <Typography>
                        Tiempo de preparacion {receta.prep_time}
                      </Typography>
                      <Typography>Calorias {receta.calories_ps}</Typography>
                      <Typography>Servings {receta.servings}</Typography>
                      <Row className="justify-content-md-center d-flex flex-column my-3">
                        <Rater
                          total={5}
                          rating={receta.rating}
                          interactive={false}
                        />
                      </Row>

                      <Link
                        to={`Info/${receta.id}`}
                        className="btn btn-primary"
                      >
                        Learn More
                      </Link>
                      <Link
                        to={`Info/${receta.id}`}
                        className="btn btn-warning"
                      >
                        Favorite
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
