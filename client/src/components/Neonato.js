import React, { Component } from "react";
import { getNeonatoData } from "./UserFunctions";

class Neonato extends Component {
  constructor() {
    super();
    this.state = {
      neonato: null,
      error: null,
    };

    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleModify = this.handleModify.bind(this);
  }

  componentDidMount() {
    this.fetchNeonatoData();
  }

  async fetchNeonatoData() {
    try {
      const token = localStorage.usertoken;
      if (!token) throw new Error("Usuario no autenticado.");

      const response = await getNeonatoData(token);
      if (response && response.length > 0) {
        this.setState({ neonato: response[0] });
      } else {
        this.setState({ error: "No se encontraron datos del neonato." });
      }
    } catch (error) {
      console.error("Error al cargar los datos del neonato:", error.message);
      this.setState({ error: "Error al cargar los datos." });
    }
  }

  handleRedirect() {
    this.props.history.push(`/newneonato`);
  }

  handleModify() {
    const { neonato } = this.state;
    this.props.history.push({
      pathname: `/editNeonato`,
      state: { neonato },
    });
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("es-AR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  render() {
    const { neonato } = this.state;

    if (!neonato) {
      return (
        <div className="container-fluid">
          <div>
            <h4 className="SinDatos">Sin datos del neonato!</h4>
          <button
            type="button"
            className="btn btn-lg btn-primary btn-block"
            onClick={this.handleRedirect}
          >
            Cargar Datos
          </button>
        </div>
        </div>
      );
    }

    if (!neonato) {
      return <h4>Cargando datos...</h4>;
    }

    return (
      <div className="container-fluid">
        <h1>Datos del neonato</h1>
        <table className="table">
          <tbody>
            <tr>
              <td>DNI:</td>
              <td>{neonato.DNI}</td>
            </tr>
            <tr>
              <td>Nombre y Apellido:</td>
              <td>{neonato.Nombre_Apellido}</td>
            </tr>
            <tr>
              <td>Sexo:</td>
              <td>{neonato.Sexo}</td>
            </tr>
            <tr>
              <td>Fecha de Nacimiento:</td>
              <td>{this.formatDate(neonato.Fecha_Nac)}</td>
            </tr>
            <tr>
              <td>Peso:</td>
              <td>{neonato.Peso} kg</td>
            </tr>
            <tr>
              <td>Altura:</td>
              <td>{neonato.Altura} cm</td>
            </tr>
            <tr>
              <td>Grupo Sanguíneo:</td>
              <td>{neonato.Grupo_Sanguineo}</td>
            </tr>
            <tr>
              <td>Condición de Nacimiento:</td>
              <td>{neonato.Condicion_Nac}</td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={this.handleModify}>
          Modificar
        </button>
      </div>
    );
  }
}

export default Neonato;
