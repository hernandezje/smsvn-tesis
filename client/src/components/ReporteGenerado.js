import React, { Component } from "react";
import { generarReporte } from "./UserFunctions";

class Reporte extends Component {
  handleGenerarReporte = async () => {
    try {
      const response = await fetch("https://srv1783.hstgr.io/users/generarReporte", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("usertoken"), // Token del usuario
        },
      });

      if (!response.ok) {
        throw new Error("Error al generar el reporte");
      }

      // Crear el archivo para descargar
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "reporte.json"; // Nombre del archivo
      a.click();

      // Liberar recursos
      window.URL.revokeObjectURL(url);
      alert("Reporte descargado con éxito.");
    } catch (err) {
      console.error("Error al generar el reporte:", err);
      alert("Hubo un error al generar el reporte. Por favor, intenta nuevamente.");
    }
  };

  render() {
    return (
      <div className="container mt-4">
        {/* Sección de descripción */}
        <div className="mb-4">
          <h3 className="text-center mb-3">Reporte de Interés</h3>
          <p className="text-justify">
            Genera un reporte detallado para el médico o interesados, proporcionando información clave sobre el comportamiento de los signos vitales del neonato en la última semana. El reporte incluye:
          </p>
          <ul>
            <li>Datos generales del neonato</li>
            <li>Antecedentes médicos</li>
            <li>Historial de estado de signos vitales</li>
            <li>Registro de alertas detectadas</li>
          </ul>
        </div>

        {/* Botón para generar reporte */}
        <div className="text-center">
          <button className="btn btn-primary btn-lg" onClick={this.handleGenerarReporte}>
            Generar y Descargar Reporte
          </button>
        </div>
      </div>
    );
  }
}

export default Reporte;
