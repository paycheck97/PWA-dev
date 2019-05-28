import React from "react";
import "./prueba.css";



function prueba() {
    
  return (
    <div className="container text-center my-3">
    <div className="row mx-auto my-auto">
        <div id="myCarousel" className="carousel slide w-100" data-ride="carousel">
            <div className="carousel-inner" role="listbox">
                <div className="carousel-item py-5 active">
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="card">
                            <img src="http://danzadefogones.com/wp-content/uploads/2016/12/Pasta-alfredo-de-calabaza-3.jpg" className="card-img-top" alt="hola"/>
                              <div className="card-body">
                                <h4 className="card-title">Card 1</h4>
                                <p className="card-text">Some make up the bulk of the card's content.</p>
                                <a href="#" className="btn btn-primary">Learn More</a>
                                <a href="#" className="btn btn-success">Favorite</a>
                              </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="carousel-item py-5">
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="card">
                            <img src="http://danzadefogones.com/wp-content/uploads/2016/12/Pasta-alfredo-de-calabaza-3.jpg" className="card-img-top" alt="hola"/>
                              <div className="card-body">
                                <h4 className="card-title">Card</h4>
                                <p className="card-text">Some make up the bulk of the card's content.</p>
                                <a href="#" className="btn btn-primary">Learn More</a>
                                <a href="#" className="btn btn-success">Favorite</a>
                              </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="carousel-item py-5">
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="card">
                             <img src="http://danzadefogones.com/wp-content/uploads/2016/12/Pasta-alfredo-de-calabaza-3.jpg" className="card-img-top" alt="hola"/>
                              <div className="card-body">
                                <h4 className="card-title">Card</h4>
                                <p className="card-text">Some make up the bulk of the card's content.</p>
                                <a href="#" className="btn btn-primary">Learn More</a>
                                <a href="#" className="btn btn-success">Favorite</a>
                              </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="carousel-item py-5">
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="card">
                            <img src="http://danzadefogones.com/wp-content/uploads/2016/12/Pasta-alfredo-de-calabaza-3.jpg" className="card-img-top" alt="hola"/>
                              <div className="card-body">
                                <h4 className="card-title">Card</h4>
                                <p className="card-text">Some make up the bulk of the card's content.</p>
                                <a href="#" className="btn btn-primary">Learn More</a>
                                <a href="#" className="btn btn-success">Favorite</a>
                              </div>
                            </div>
                        </div>
            
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col-12">
            <a className="carousel-control-prev text-dark" href="#myCarousel" role="button" data-slide="prev">
                <span className="fa fa-chevron-left" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
                <p>Previous</p>
            </a>
            <a className="carousel-control-next text-dark" href="#myCarousel" role="button" data-slide="next">
                <span className="fa fa-chevron-right" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
                <p>Next</p>
            </a>
        </div>
    </div>
</div>

  );
}

export default prueba;
