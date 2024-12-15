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
        .get("https://srv1783.hstgr.io/users/historial", {
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
      <div className="container-fluid">
  <h1 className="h3 mb-3 font-weight-normal">Historial</h1>
    <div className="col-sm-8 mx-auto">
    </div>
    <div className="table-responsive">
      <table className="table">
        <thead className="thead">
              <tr>
                <th scope="col" className="cb">Fecha Inic.</th>
                <th scope="col" className="cb">Fecha Fin</th>
                <th scope="col" className="cb">Estado</th>
                <th scope="col" className="cb">Alertas</th>
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
                    className="btn btn-sm btn-primary"
                    onClick={() =>
                      this.handleAlertRedirect(
                        this.formatDateForSend(historial.Fecha_Inicio),
                        this.formatDateForSend(historial.Fecha_Fin)
                      )
                    }
                  >
                    Ver
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
