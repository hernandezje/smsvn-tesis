import React, { Component } from "react";
import axios from "axios";

class EditUsuario extends Component {
  constructor(props) {
    super(props);
    const { usuario } = this.props.location.state || {}; // Obtenemos los datos enviados desde handleModify
    this.state = {
      usuario: usuario || {
        Usuario: "",
        Email: "",
        DNI: "",
        Nombre_Apellido: "",
        Telefono: "",
        Parentezco: "",
        Progenitor: "",
        Direccion: "",
      },
      error: null,
      mensaje: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      usuario: { ...prevState.usuario, [name]: value },
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { usuario } = this.state;

    try {
      const response = await axios.put(
        `/users/editUsuario/${usuario.idUsuario}`, // Asegúrate de que "id" esté presente en los datos del usuario
        usuario,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      this.setState({ mensaje: "Usuario actualizado con éxito.", error: null });
      // Redirige a /usuarioData
    this.props.history.push("/usuarioData");
    
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      this.setState({ error: "Error al actualizar el usuario.", mensaje: null });
    }
  }

  onCancel() {
    this.props.history.push(`/usuarioData`);
  }

  render() {
    const { usuario, error, mensaje } = this.state;

    return (
      <div className="container-fluid">
        <h1 className="h3 mb-3 font-weight-normal">Editar Usuario</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        {mensaje && <div className="alert alert-success">{mensaje}</div>}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              name="Usuario"
              className="form-control"
              value={usuario.Usuario || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="Email"
              className="form-control"
              value={usuario.Email || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>DNI</label>
            <input
              type="text"
              name="DNI"
              className="form-control"
              value={usuario.DNI || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Nombre y Apellido</label>
            <input
              type="text"
              name="Nombre_Apellido"
              className="form-control"
              value={usuario.Nombre_Apellido || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="text"
              name="Telefono"
              className="form-control"
              value={usuario.Telefono || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Parentesco</label>
            <input
              type="text"
              name="Parentezco"
              className="form-control"
              value={usuario.Parentezco || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Progenitor</label>
            <select
              name="Progenitor"
              className="form-control"
              value={usuario.Progenitor || ""}
              onChange={this.handleChange}
            >
              <option value="SI">Sí</option>
              <option value="NO">No</option>
            </select>
          </div>
          <div className="form-group">
            <label>Dirección</label>
            <input
              type="text"
              name="Direccion"
              className="form-control"
              value={usuario.Direccion || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="mt-3">
          <button type="submit" className="btn btn-primary mr-2">
            Guardar
          </button>
          <button type="button" className="btn btn-danger mr-2" onClick={this.onCancel} >
            Cancelar
          </button>
        </div>
        </form>
      </div>
    );
  }
}

export default EditUsuario;
