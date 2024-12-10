import React, { Component } from "react";

class EstadoActual extends Component {
  render() {
    return (
      <div className="container-fluid"> 
      <div className="container mt-4">
        {/* Estado */}
       {/* (<div className="text-center bg-light py-3 mb-4">
          <h3>
            <strong>Estado:</strong> <span className="text-success">Normal!</span>
          </h3>
        </div>) : */}
        <div className="text-center bg-light py-3 mb-4">
          <h3 className="text-danger">
            <strong>¡ALERTA!</strong>
          </h3>
        

        {/* Tabla de alerta */}
        <div className="mb-4">
          <table className="table table-bordered text-center">
            <thead className="thead" >
              <tr>
                <th className="cb">Fecha-Hora</th>
                <th className="cb">Sensor</th>
                <th className="cb">Medición</th>
                <th className="cb">Gravedad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>03/12/2024 01:27</td>
                <td>Frec. Resp.</td>
                <td>60/40 mmHg</td>
                <td>Leve</td>
              </tr>
              <tr>
                <td>03/12/2024 01:30</td>
                <td className="text-danger">Presión</td>
                <td className="text-danger">40 resp/min</td>
                <td className="text-danger">Grave</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
        {/* Signos Vitales */}
        <div className="mb-4">
          <h5 className="mb-3">Signos Vitales</h5>
          <table className="table table-bordered text-center">
            <thead className="thead">
              <tr>
                <th className="cb">Fecha-Hora</th>
                <th className="cb">Signo</th>
                <th className="cb">Medición</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>03/12/2024 01:27</td>
                <td>Temperatura</td>
                <td className="text-success">36.0°C</td>
              </tr>
              <tr>
                <td>03/12/2024 01:27</td>
                <td>Frec. Resp.</td>
                <td className="text-warning">40 resp/min</td>
              </tr>
              <tr>
                <td>03/12/2024 01:30</td>
                <td>Presión</td>
                <td className="text-danger">60/40 mmHg</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Estado de los sensores */}
        <div>
          <h5 className="mb-3">Estado de los sensores</h5>
          <table className="table table-bordered text-center">
            <thead className="thead">
              <tr>
                <th className="cb">Temperatura</th>
                <th className="cb">Frec. Resp.</th>
                <th className="cb">Presión</th>
                <th className="cb">Humedad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-success">Activo</td>
                <td className="text-success">Activo</td>
                <td className="text-success">Activo</td>
                <td className="text-danger">Inactivo</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br/>
        <br/>
      </div>
      </div>
    );
  }
}

export default EstadoActual;
