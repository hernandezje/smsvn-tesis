import React, { Component } from "react";
import SignosVitales from "./SignosVitalesTiempoReal";
import EstadoSensores from "./EstadoSensoresTiempoReal";
import AlertasMonitor from "./AlertaTiempoReal";

class EstadoActual extends Component {
  render() {
    return (
      <div className="container-fluid"> 
      <div className="container mt-4">
        {/* Estado */}
       <AlertasMonitor></AlertasMonitor>

        {/* Signos Vitales */}
        <SignosVitales></SignosVitales>

        {/* Estado de los sensores */}
        <EstadoSensores></EstadoSensores>
        <br/>
        <br/>
      </div>
      </div>
    );
  }
}

export default EstadoActual;
