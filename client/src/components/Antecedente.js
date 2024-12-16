import React, { Component } from "react";
import { getAntecedentesData } from "./UserFunctions"; // Importar la función

class Antecedente extends Component {
  constructor() {
    super();
    this.state = {
      antecedentes: null, // Cambiamos a null para indicar que no hay datos inicialmente
      error: null,   // Inicializamos el error como null
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this); // Enlazamos el manejador del botón
    this.handleModify = this.handleModify.bind(this); // Manejador para el botón Modificar
  }

  onSubmit(e) {
    e.preventDefault();
  }

  handleRedirect() {
    // Redirigir al formulario de /newantecedentes
    this.props.history.push(`/newantecedentes`);
  }

  componentDidMount() {
    // Obtener el token del localStorage
    const token = localStorage.usertoken;

    if (token) {
      // Usar la función getAntecedenteData para obtener los datos
      getAntecedentesData(token)
        .then((response) => {
          // Suponiendo que la respuesta es un array con un objeto
          if (response && response.length > 0) {
            this.setState({ antecedentes: response[0] }); // Guardar el primer objeto en el estado
          } else {
            this.setState({ error: "No se encontraron datos de antecedentes." });
          }
        })
        .catch((err) => {
          console.error("Error al cargar los datos de antecedentes:", err);
          this.setState({ error: "Error al cargar los datos." });
        });
    }
  }

  handleModify() {
    // Redirige a una página de edición, enviando los datos del usuario
    const { antecedentes } = this.state;
    console.log("Datos a modificar:", antecedentes);

    if (!antecedentes) {
      console.log("No hay antecedentes disponibles para modificar.");
      return;
    }

    // Redirige con los datos del usuario
    this.props.history.push({
      pathname: `/editAntecedente`,
      state: { antecedentes }, // Pasa el objeto antecedentes al componente de edición
    });
  }

  render() {
    const { antecedentes } = this.state; // Extraemos los datos del estado
    console.log("Trae antecedentes:", antecedentes);

    // Si NO hay datos
    if (!antecedentes) {
      return (
        <div className="container-fluid">
          <div>
            <h4 className="SinDatos">Sin datos de antecedentes médicos del neonato!</h4>
            <button
              type="button"
              className="btn btn-lg btn-primary btn-block"
              onClick={this.handleRedirect} // Asigna el manejador del clic
            >
              Cargar Datos
            </button>
          </div>
        </div>
      ); // Mensaje si no hay datos
    }

    return (
      <div className="container-fluid">
        <h1 className="h3 mb-3 font-weight-normal">Datos de antecedentes médicos del neonato</h1>
        <table className="table">
          <tbody>
            <tr>
              <td>Adicciones?</td>
              <td>{antecedentes.Adicciones}</td>
            </tr>
            <tr>
              <td>Descripcion de Adicciones:</td>
              <td>{antecedentes.Descripcion_Adic}</td>
            </tr>
            <tr>
              <td>Patologías?</td>
              <td>{antecedentes.Patologias}</td>
            </tr>
            <tr>
              <td>Descripción de Patologías:</td>
              <td>{antecedentes.Descripcion_Pat}</td>
            </tr>
            <tr>
              <td>Recibe tratamientos?</td>
              <td>{antecedentes.Recibe_Tratamiento}</td>
            </tr>
            <tr>
              <td>Descripción de Tratamientos:</td>
              <td>{antecedentes.Descripcion_Tratam}</td>
            </tr>
            <tr>
              <td>Alergías?</td>
              <td>{antecedentes.Alergias}</td>
            </tr>
            <tr>
              <td>Descripción de Alergías:</td>
              <td>{antecedentes.Descripcion_Aler}</td>
            </tr>
            <tr>
              <td>Vacunas?</td>
              <td>{antecedentes.Vacunas}</td>
            </tr>
            <tr>
              <td>Descripción de Vacunas:</td>
              <td>{antecedentes.Descripcion_Vac}</td>
            </tr>
          </tbody>
        </table>

        {/* Botones Modificar */}
        <div className="mt-3">
          <button className="btn btn-primary mr-2" onClick={this.handleModify}>
            Modificar
          </button>
        </div>
      </div>
    );
  }
}

export default Antecedente;
