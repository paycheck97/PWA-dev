import React, { Component } from "react";
import "./prueba.css";
import { Link } from 'react-router-dom'

class prueba extends Component {
  state = {
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

  render() {
    const { recetas } = this.state;
    return (
      <div className="container text-center my-3">
        <div className="row mx-auto my-auto">
          <div
            id="myCarousel"
            className="carousel slide w-100"
            data-ride="carousel"
          >
            <div className="carousel-inner" role="listbox">
              {recetas.map(receta => (
                <div className="carousel-item py-5 active" key={receta.id}>
                  <div className="row">
                    <div className="col-sm-5">
                      <div className="card">
                        <img
                          src={receta.thumbnail}
                          className="card-img-top"
                          alt=  {receta.nombre}
                        />
                        <div className="card-body">
                          <h4 className="card-title">{receta.name}</h4>
                          <p className="card-text">
                            {receta.instructions}
                          </p>
                          <Link To='/Info' className="btn btn-primary">Learn More</Link>
                          <Link To='/Info' className="btn btn-warning">Favorite</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <a
              className="carousel-control-prev text-dark"
              href="#myCarousel"
              role="button"
              data-slide="prev"
            >
              <span className="fa fa-chevron-left" aria-hidden="true" />
              <span className="sr-only">Previous</span>
              <p>Previous</p>
            </a>
            <a
              className="carousel-control-next text-dark"
              href="#myCarousel"
              role="button"
              data-slide="next"
            >
              <span className="fa fa-chevron-right" aria-hidden="true" />
              <span className="sr-only">Next</span>
              <p>Next</p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default prueba;
