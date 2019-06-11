import React, { Component }  from "react";
import "./login.css";
import MenuAppBar from "../components/navbar";
import Info2 from "../components/InfoCard";
import axios from 'axios';
import Card from 'react-bootstrap/Card'

class Info extends Component {
  state = {
    recetas: [],
    receta_id: null,
    expanded: false 
  };
 
  componentDidMount() {
    fetch( `/view-recipe/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(recetas =>
        this.setState({ recetas }, () =>
          console.log("Fetch realizado", recetas)
        )
      );
  }
  render(){
    const { recetas } = this.state;
  return (
    <div>
      <MenuAppBar />
      {recetas.map(receta =>(
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={receta.thumbnail} />
          <Card.Body>
          <Card.Title>{receta.name}</Card.Title>
          <Card.Text>
        {receta.instructions}
          </Card.Text>
           
        </Card.Body>
        </Card>
      ))}
      </div>
  )
}
}

export default Info;
