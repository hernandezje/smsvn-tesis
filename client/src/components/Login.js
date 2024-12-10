import React, { Component } from "react";
import { login } from "./UserFunctions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      Usuario: "", // Campo para el nombre de usuario
      Clave: "",   // Campo para la contraseña
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      Usuario: this.state.Usuario,
      Clave: this.state.Clave
    };

    login(user).then(res => {
      if (res) {
        this.props.history.push(`/estadoActual`); // Redirige al perfil del usuario tras el login
      }
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Iniciar Sesión</h1>
              <div className="form-group">
                <label htmlFor="Usuario">Nombre de Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  name="Usuario"
                  placeholder="Ingrese su usuario"
                  value={this.state.Usuario}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Clave">Clave</label>
                <input
                  type="password"
                  className="form-control"
                  name="Clave"
                  placeholder="Ingrese su clave"
                  value={this.state.Clave}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
