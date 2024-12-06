import React, { Component } from "react";
import axios from "axios";

class Historial extends Component {
  constructor() {
    super();
    this.state = {
      historial: [], // Almacena todos los historial
      errors: {}
    };
  }
  

  componentDidMount() {
    // Obtener el token del localStorage
    const token = localStorage.usertoken;

    // Verificar si hay un token
    if (token) {
      // Hacer la solicitud para obtener todos los historial desde el backend
      axios
        .get("http://localhost:5000/users/historial", {
          headers: {
            Authorization: token
          }
        })
        .then((response) => {
          // Actualizar el estado con los datos recibidos
          this.setState({ historial: response.data });
        })
        .catch((error) => {
          console.error("Error al obtener los historial:", error);
        });
    } else {
      console.log("No token found");
    }
  }

  //Formato visual
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
      second: "2-digit",
      hour12: false, // 24-hour format
    });
  }

  //Formato de envio
  formatDateForSend(dateString) {
    // Convertir la cadena de fecha a un objeto Date
    const date = new Date(dateString);
  
    // Extraer los componentes de la fecha y hora
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Mes en formato 2 dígitos
    const day = String(date.getDate()).padStart(2, "0"); // Día en formato 2 dígitos
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
  
    // Formato: YYYY-MM-DDTHH:mm:ss
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
  
  

  handleAlertRedirect = (fechaInicio, fechaFin) => {
    console.log("ver",fechaInicio,fechaFin);
    const { history } = this.props;
    // Redirigir a la ruta con las fechas como parámetros de consulta
    history.push(`/alertas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  };

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Historial</h1>
          </div>
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Fecha_Inicio</th>
                <th>Fecha_Fin</th>
                <th>Estado</th>
                <th>Ver en detalle</th>
              </tr>
            </thead>
            <tbody>
              {this.state.historial.length > 0 ? (
                this.state.historial.map((historial, index) => (
                  <tr key={index}>
                    <td>{this.formatDate(historial.Fecha_Inicio)}</td>
                    <td>{this.formatDate(historial.Fecha_Fin)}</td>
                    <td>{historial.Estado}</td>
                    <td>
                    {historial.Estado !== "Normal" && (
                      
                    <button
                    className="btn btn-warning"
                    onClick={() =>
                      this.handleAlertRedirect(
                        this.formatDateForSend(historial.Fecha_Inicio),
                        this.formatDateForSend(historial.Fecha_Fin)
                      )
                    }
                  >
                    Ver Alerta
                  </button>
                  )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No hay historial disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Historial;
