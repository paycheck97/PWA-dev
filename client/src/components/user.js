import React from "react";
import "./user.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Col from "react-bootstrap/Col";
import MenuAppBar from "./navbar";
import Recetas from "./recetasuser";
import Row from 'react-bootstrap/Row'
import { Container } from "@material-ui/core";

const User = () => {
  const bull = <span>•</span>;
  return (
    <>
      <MenuAppBar />
      <Container>
        <Row>
        <Col xl={4} sm={12}>
          <Card id="carta">
          <CardContent>
            <Typography variant="h5" component="h2">
              User{bull}Name{" "}
            </Typography>
            <Typography component="p">
              "No hay amor mas sincero <br />
              que el amor a la comida"
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" id="bot">
              Edit Username
            </Button>
          </CardActions>
        </Card>
        </Col>
        <Col xl={8} sm={12}>
          <Typography variant="h4">
            Recetas Favoritas
          </Typography>
        <div id="recetas">
          <Recetas />
        </div>
        </Col>
        </Row>
      </Container>
    </>
  );
};

export default User;
