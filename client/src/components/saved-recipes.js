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
import Button from "react-bootstrap/Button";

/**
 * Vista de recetas guardadas por el Usuario.
 * @visibleName User/Favorites
 */
class prueba extends Component {
  state = {
    recetas: [],
    receta_id: null,
    rating: null,
    userID: null
  };

  removeHandler = async id => {
    console.log(id);
    const { userID } = this.state;
    try {
      await axios.post(`/delete-saved/${id}`, { userID });
      
      alert("Receta Borrada con exito");
      this.forceUpdate()
    } catch (err) {
      console.log(err);
    }
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
                  <div className="card shadow-md my-2">
                    <img
                      className="d-block w-100"
                      src={receta.thumbnail}
                      alt={receta.nombre}
                    />
                    <div className="card-body justify-content-md-center">
                      <Typography className="my-3" variant="h4">{receta.name}</Typography>
                      <Typography>
                        Tiempo de preparacion {receta.prep_time}
                      </Typography>
                      <Typography>Calorias {receta.calories_ps}</Typography>
                      <Typography>Servings {receta.servings}</Typography>
                      <div className="btn-group my-4">
                        <Link
                          to={`Info/${receta.id}`}
                          className="btn btn-primary"
                        >
                          Learn More
                        </Link>
                        <Button
                          onClick={this.removeHandler.bind(this, receta.id)}
                          variant="Remove"
                          className="btn btn-danger"
                          type="submit"
                        >
                          Remove
                        </Button>
                      </div>
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
