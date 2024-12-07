import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Neonato from "./components/Neonato";
import Contactos from "./components/Contactos";
import Antecedente from "./components/Antecedente";
import NewNeonato from "./components/NewNeonato";
import NewAntecedentes from "./components/NewAntecedentes";
import Historial from "./components/Historial";
import UsuarioData from "./components/UsuarioData";
import EditUsuario from "./components/EditUsuarioData";
import Alertas from "./components/Alertas";
import EditNeonato from "./components/EditNeonatoData";
import EditAntecedenteData from "./components/EditAntecedenteData";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/contactos" component={Contactos} />
            <Route exact path="/neonato" component={Neonato} />
            <Route exact path="/antecedentes" component={Antecedente} />
            <Route exact path="/newneonato" component={NewNeonato} />
            <Route exact path="/newantecedentes" component={NewAntecedentes} />
            <Route exact path="/historial" component={Historial} />
            <Route exact path="/usuarioData" component={UsuarioData} /> 
            <Route exact path="/editUsuario" component={EditUsuario} />
            <Route exact path="/alertas" component={Alertas} />
            <Route exact path="/editNeonato" component={EditNeonato} />
            <Route exact path="/editAntecedente" component={EditAntecedenteData} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
