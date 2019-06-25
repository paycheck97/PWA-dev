import React, {Component} from "react";
import "./user.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Col from "react-bootstrap/Col";
import MenuAppBar from "./navbar";
import Recetas from "./saved-recipes";
import Row from 'react-bootstrap/Row'
import { Container } from "@material-ui/core";
import jwt_decode from 'jwt-decode';
import { withRouter } from "react-router-dom";





class User extends Component {

  state = {
    name: '',
    last_name: ''
  }

  componentDidMount(){
    const token = localStorage.userToken;
    const decode = jwt_decode(token)
    this.setState({
      name: decode.name,
      last_name: decode.last_name
    })

  }

  componentWillMount = () => {
    const token = localStorage.userToken;
    if (token == null) {
      this.props.history.push("/");
      alert("Usted no ha iniciado sesion.");
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }


  render(){
    const bull = <span>•</span>;
    const name = this.state.name;
    const last_name = this.state.last_name;
  return (
    <>
      <MenuAppBar />
      <Container>
        <Row>
        <Col xl={4} sm={12}>
          <Card id="carta">
          <CardContent>
            <Typography variant="h5" component="h2">
              {name}{bull}{last_name}{" "}
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
          <Typography variant="h4" className="my-3">
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

  }
  
export default withRouter(User);
