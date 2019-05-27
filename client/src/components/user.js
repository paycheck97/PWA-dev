
import React from "react";
import "./user.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";


import MenuAppBar from "./navbar";
import Recetas from "./recetas";

const User = () => {
  const bull = <span>•</span>;
  return (
    <>
      <MenuAppBar />
      <Card id="carta">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Pagina de Usuario
          </Typography>
          <Typography variant="h5" component="h2">
            User{bull}Name{" "}
          </Typography>
          <Typography component="p">
            "No hay amor mas sincero <br />
            que el amor a la comida"
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Edit Username</Button>
        </CardActions>
      </Card>
      <Paper id="recetas">
        <h1> Recetas Favoritas </h1>
        <Recetas />
      </Paper>
    </>
  );
};


export default User;

