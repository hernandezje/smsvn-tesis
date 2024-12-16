import React, { Component } from "react";
import { updateNeonato } from "./UserFunctions"; // Importar la función

class EditNeonato extends Component {
  constructor(props) {
    super(props);
    const { neonato } = this.props.location.state || {}; // Obtenemos los datos enviados desde handleModify
    this.state = {
      neonato: neonato || {
        DNI: "",
        Nombre_Apellido: "",
        Sexo: "",
        Fecha_Nac: "",
        Peso: "",
        Altura: "",
        Grupo_Sanguineo: "",
        Condicion_Nac: "",
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
      neonato: { ...prevState.neonato, [name]: value },
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { neonato } = this.state;
    try {
      const response = await updateNeonato(neonato.idLactante, neonato); // Llamamos a la función updateNeonato
      this.setState({ mensaje: "Datos del neonato actualizados correctamente.", error: null });
      // Redirige a una página específica después de la actualización
      this.props.history.push("/neonato");
    } catch (error) {
      console.error("Error al actualizar los datos del neonato:", error);
      this.setState({ error: "Error al actualizar los datos del neonato.", mensaje: null });
    }
  }

  formatDate(dateString) {
    if (!dateString) return ""; // Si no hay fecha, retornar una cadena vacía
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  onCancel() {
    this.props.history.push("/neonato");
  }

  render() {
    const { neonato, error, mensaje } = this.state;

    return (
      <div className="container-fluid">
        <h1 className="h3 mb-3 font-weight-normal">Editar Datos del Neonato</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        {mensaje && <div className="alert alert-success">{mensaje}</div>}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>DNI</label>
            <input
              type="text"
              name="DNI"
              className="form-control"
              value={neonato.DNI || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Nombre y Apellido</label>
            <input
              type="text"
              name="Nombre_Apellido"
              className="form-control"
              value={neonato.Nombre_Apellido || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Sexo</label>
            <select
              name="Sexo"
              className="form-control"
              value={neonato.Sexo || ""}
              onChange={this.handleChange}
            >
              <option value="VARON">Varón</option>
              <option value="MUJER">Mujer</option>
            </select>
          </div>
          <div className="form-group">
            <label>Fecha de Nacimiento</label>
            <input
              type="datetime-local"
              name="Fecha_Nac"
              className="form-control"
              value={this.formatDate(neonato.Fecha_Nac) || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Peso (kg)</label>
            <input
              type="number"
              step="0.01"
              name="Peso"
              className="form-control"
              value={neonato.Peso || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Altura (cm)</label>
            <input
              type="number"
              name="Altura"
              className="form-control"
              value={neonato.Altura || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Grupo Sanguíneo</label>
            <input
              type="text"
              name="Grupo_Sanguineo"
              className="form-control"
              value={neonato.Grupo_Sanguineo || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Condición de Nacimiento</label>
            <textarea
              name="Condicion_Nac"
              className="form-control"
              rows="3"
              value={neonato.Condicion_Nac || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-primary mr-2">
              Guardar
            </button>
            <button
              type="button"
              className="btn btn-danger mr-2"
              onClick={this.onCancel}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditNeonato;
