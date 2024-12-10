import React, { Component } from "react";
import axios from "axios";

class Neonato extends Component {
  constructor() {
    super();
    this.state = {
      neonato: null, // Cambiamos a null para indicar que no hay datos inicialmente
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
    // Redirigir al formulario de /newneonato
    this.props.history.push(`/newneonato`);
  }

  componentDidMount() {
    // Obtener el token del localStorage
    const token = localStorage.usertoken;

    if (token) {
      // Realizar la solicitud al backend para obtener los datos
      axios
        .get("http://localhost:5000/users/neonato", {
          headers: { Authorization: token },
        })
        .then((response) => {
          // Suponiendo que la respuesta es un array con un objeto
          if (response.data && response.data.length > 0) {
            this.setState({ neonato: response.data[0] }); // Guardar el primer objeto en el estado
          } else {
            this.setState({ error: "No se encontraron datos del neonato."});
          }
        })
        .catch((err) => {
          console.error("Error al cargar los datos del neonato:", err);
          this.setState({ error: "Error al cargar los datos."});
        });
    } 
  }

  handleModify() {
    // Redirige a una página de edición, enviando los datos del usuario
    const { neonato } = this.state;
    this.props.history.push({
      pathname: `/editNeonato`,
      state: { neonato }, // Pasa el usuario actual al formulario de edición
    });
  }
  
  formatDate(dateString) {
    // Convertir la cadena de fecha a un objeto Date
    const date = new Date(dateString);

    // Usar toLocaleString para formatear la fecha
    return date.toLocaleString("es-AR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24-hour format
    });
  }

  render() {
    const { neonato, error } = this.state; // Extraemos los datos del estado
    if (!neonato) {
      
      return (     
        <div className="container-fluid">  
            <div>
              <h4 className="SinDatos">Sin datos del neonato!</h4>
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

    // Si hay datos
    return (
      <div className="container-fluid">
        <h1 className="h3 mb-3 font-weight-normal">Datos del neonato</h1>
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

export default Neonato;