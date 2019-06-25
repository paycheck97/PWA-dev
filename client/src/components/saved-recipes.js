import React, { Component } from "react";
import "./recetasuser.css";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import { Typography } from "@material-ui/core";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import axios from "axios";
import jwt_decode from "jwt-decode";

class prueba extends Component {
  state = {
    recetas: [],
    receta_id: null,
    rating: null,
    userID: null
  };

  componentDidMount = event => {
    const token = localStorage.userToken;
    if (token != null) {
      const decode = jwt_decode(token);

      this.setState({ userID: decode.id }, () => {
        const id_user = this.state.userID;
        console.log(id_user);
        try {
          axios
            .post("/saved-recipes", {
              id_user
            })
            .then(res => {
              const recetas = res.data;
              this.setState({ recetas });
            });
        } catch (e) {
          alert(e);
        }
      });
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
