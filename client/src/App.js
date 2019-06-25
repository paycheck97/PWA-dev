import React from "react";
import "./App.css";
import Dashboard from "./components/dashboard.js";
import Info from "./components/info";
import Admin from "./components/admin";
import Edit from "./components/edit";
import Agregar from "./components/agregar";
import Ingredientes from "./components/ingred";

//import {Provider} from './components/context';

// Import the History component to be used below

import Login from "./components/login";
import { BrowserRouter, Route } from "react-router-dom";
import User from "./components/user";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route path="/User" component={User} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/Info/:id" component={Info} />
        <Route path="/Admin" component={Admin} />
        <Route path="/Edit/:id" component={Edit} />
        <Route path="/Agregar" component={Agregar} />
        <Route path="/Ingredientes" component={Ingredientes} />
      </div>
    </BrowserRouter>
  );
}

export default App;
