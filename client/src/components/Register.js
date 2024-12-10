import React, { Component } from "react";
import { register } from "./UserFunctions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      // Estado para la tabla 'contacto'
      DNI: "",
      Nombre_Apellido: "",
      Telefono: "",
      Parentezco: "",
      Progenitor: "NO", // Valor inicial para set 'SI','NO'
      Direccion: "",

      // Estado para la tabla 'usuario'
      Usuario: "",
      Clave: "",
      Email: "",

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

    const Contacto = {
      DNI: this.state.DNI,
      Nombre_Apellido: this.state.Nombre_Apellido,
      Telefono: this.state.Telefono,
      Parentezco: this.state.Parentezco,
      Progenitor: this.state.Progenitor,
      Direccion: this.state.Direccion,
      Usuario: this.state.Usuario,
      Clave: this.state.Clave,
      Email: this.state.Email,
    };

    register(Contacto).then(() => {
      this.props.history.push(`/login`);
    });
  }

  render() {
    

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Registro de Usuario</h1>

              {/* Sección para los datos de la tabla 'contacto' */}
              <div className="form-group">
                <label htmlFor="DNI">DNI</label>
                <input
                  type="text"
                  className="form-control"
                  name="DNI"
                  placeholder="Ingrese su DNI"
                  value={this.state.DNI}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Nombre_Apellido">Nombre y Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  name="Nombre_Apellido"
                  placeholder="Ingrese su nombre y apellido"
                  value={this.state.Nombre_Apellido}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Telefono">Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  name="Telefono"
                  placeholder="Ingrese su teléfono"
                  value={this.state.Telefono}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Parentezco">Parentesco</label>
                <input
                  type="text"
                  className="form-control"
                  name="Parentezco"
                  placeholder="Ingrese su parentesco"
                  value={this.state.Parentezco}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Progenitor">Progenitor Sanguíneo?</label>
                <select
                  className="form-control"
                  name="Progenitor"
                  value={this.state.Progenitor}
                  onChange={this.onChange}
                >
                  <option value="NO">NO</option>
                  <option value="SI">SI</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="Direccion">Dirección</label>
                <input
                  type="text"
                  className="form-control"
                  name="Direccion"
                  placeholder="Ingrese su dirección"
                  value={this.state.Direccion}
                  onChange={this.onChange}
                />
              </div>

              {/* Sección para los datos de la tabla 'usuario' */}
              <div className="form-group">
                <label htmlFor="Usuario">Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  name="Usuario"
                  placeholder="Ingrese su nombre de usuario"
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
              <div className="form-group">
                <label htmlFor="Email">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  name="Email"
                  placeholder="Ingrese su correo electrónico"
                  value={this.state.Email}
                  onChange={this.onChange}
                />
              </div>
              <div className="mt-3">
              <button
                type="submit"
                className="btn btn-primary mr-2"
              >
                Registrar
              </button>
              
              <button className="btn btn-danger" >
            Cancelar
          </button>
        </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
