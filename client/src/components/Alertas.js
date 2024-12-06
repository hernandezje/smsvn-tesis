import React, { Component } from "react";
import axios from "axios";

class Alertas extends Component {
  constructor() {
    super();
    this.state = {
      alertas: [], // Almacena las alertas filtradas
      errors: {}
    };
  }

  componentDidMount() {
    // Obtener los parámetros de consulta desde la URL
    const queryParams = new URLSearchParams(this.props.location.search);
    const fechaInicio = queryParams.get("fechaInicio");
    const fechaFin = queryParams.get("fechaFin");

    // Verificar si las fechas están disponibles
    if (fechaInicio && fechaFin) {
      // Hacer la solicitud para obtener las alertas filtradas
      axios
        .get(`http://localhost:5000/users/alertas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
        .then((response) => {
          // Actualizar el estado con las alertas recibidas
          this.setState({ alertas: response.data });
        })
        .catch((error) => {
          console.error("Error al obtener las alertas:", error);
          this.setState({ errors: { message: "Error al obtener las alertas" } });
        });
    }
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
      second: "2-digit",
      hour12: false, // Formato de 24 horas
    });
  }

  render() {
    const { alertas, errors } = this.state;

    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Alertas Filtradas</h1>
          </div>
          {errors.message ? (
            <div className="alert alert-danger text-center">{errors.message}</div>
          ) : (
            <table className="table table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Fecha y Hora</th>
                  <th>Tipo de Sensor</th>
                  <th>Valor Detectado</th>
                  <th>Gravedad</th>
                </tr>
              </thead>
              <tbody>
                {alertas.length > 0 ? (
                  alertas.map((alerta) => (
                    <tr key={alerta.idAlerta}>
                      <td>{this.formatDate(alerta.Fecha_Hora)}</td>
                      <td>{alerta.Tipo_Sensor}</td>
                      <td>{alerta.Valor_Detectado}</td>
                      <td>{alerta.Gravedad}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No se encontraron alertas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

export default Alertas;
