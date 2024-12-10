import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
  }

  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push(`/`);
  }

  handleMenuItemClick() {
    const navbarCollapse = document.getElementById("navbarsExample10");
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      navbarCollapse.classList.remove("show");
    }
  }

  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link" onClick={this.handleMenuItemClick}>
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link" onClick={this.handleMenuItemClick}>
            Register
          </Link>
        </li>
      </ul>
    );

    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/estadoActual" className="nav-link" onClick={this.handleMenuItemClick}>
            Estado Actual
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/neonato" className="nav-link" onClick={this.handleMenuItemClick}>
            Datos del Bebé
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/antecedentes" className="nav-link" onClick={this.handleMenuItemClick}>
            Antecedentes Médicos
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/historial" className="nav-link" onClick={this.handleMenuItemClick}>
            Historial
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/usuarioData" className="nav-link" onClick={this.handleMenuItemClick}>
            Mis datos
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Contactos" className="nav-link" onClick={this.handleMenuItemClick}>
            Contactos
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Reporte" className="nav-link" onClick={this.handleMenuItemClick}>
            Reporte
          </Link>
        </li>
        <li className="nav-item">
          <a href="/" onClick={(e) => { this.logOut(e); this.handleMenuItemClick(); }} className="nav-link">
            Salir
          </a>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary" >
        <div className="container-fluid" id="navbar">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExample10"
            aria-controls="navbarsExample10"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse justify-content-start"
            id="navbarsExample10"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={this.handleMenuItemClick}>
                  Home
                </Link>
              </li>
            </ul>
            {localStorage.usertoken ? userLink : loginRegLink}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Landing);
