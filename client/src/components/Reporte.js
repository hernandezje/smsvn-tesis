import React, { Component } from "react";
import { generarReporte } from "./UserFunctions";
import jsPDF from "jspdf";
import "jspdf-autotable";

class Reporte extends Component {
  state = {
    showModal: false, // Controla la visibilidad del modal
    modalMessage: "", // Mensaje para el modal
  };

  handleGenerarReporte = async () => {
    try {
      // Llamar a la función para obtener los datos del reporte
      const { lactanteData, historialData } = await generarReporte();
      console.log("Datos del reporte:", lactanteData, historialData);

      // Verificar si los datos existen
      if (!lactanteData.length || !historialData.length) {
        alert("No hay datos disponibles para generar el reporte.");
        return;
      }

      // Crear el PDF
      const doc = new jsPDF();
      const fechaActual = new Date().toLocaleString();

      // Título principal
      doc.setFont("helvetica", "bold"); 
      doc.setFontSize(16);
      doc.text("Historial de signos vitales del neonato", 105, 20, { align: "center" });

      // Subtítulo y fecha
      doc.setFontSize(12);
      doc.text("Últimos 10 días", 105, 30, { align: "center" });
      doc.setFont("helvetica", "normal");
      doc.text(`Fecha y hora de generación del reporte: ${fechaActual}`, 10, 40);

      // Datos del neonato (hay un lactante)
      const lactante = lactanteData[0];
      doc.setFont("helvetica", "bold"); 
      doc.setFontSize(14);
      doc.text("Datos del neonato", 10, 50);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      const datosNeonato = [
        `DNI: ${lactante.DNI}`,
        `Nombre y Apellido: ${lactante.Nombre_Apellido}`,
        `Sexo: ${lactante.Sexo}`,
        `Fecha de Nacimiento: ${new Date(lactante.Fecha_Nac).toLocaleDateString()}`,
        `Peso: ${lactante.Peso} kg`,
        `Altura: ${lactante.Altura} cm`,
        `Grupo Sanguíneo: ${lactante.Grupo_Sanguineo}`,
        `Condición de Nacimiento: ${lactante.Condicion_Nac}`,
      ];
      datosNeonato.forEach((line, index) => doc.text(line, 10, 60 + index * 6));

      // Datos de antecedentes médicos
      const startYAntecedentes = 60 + datosNeonato.length * 6 + 10; // Ajustar la posición vertical
      doc.setFont("helvetica", "bold"); 
      doc.setFontSize(14);
      doc.text("Antecedentes Médicos", 10, startYAntecedentes);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      const datosAntecedentes = [
        `Adicciones?: ${lactante.Adicciones}`,
        `Descripción de adicciones: ${lactante.Descripcion_Adic}`,
        `Patologías?: ${lactante.Patologias}`,
        `Descripción de patologías: ${lactante.Descripcion_Pat}`,
        `Recibe Tratamiento?: ${lactante.Recibe_Tratamiento}`,
        `Descripción de tratamiento: ${lactante.Descripcion_Tratam}`,
        `Alergias?: ${lactante.Alergias}`,
        `Descripción de alergias: ${lactante.Descripcion_Aler}`,
        `Vacunas?: ${lactante.Vacunas}`,
        `Descripción de vacunas: ${lactante.Descripcion_Vac}`,
      ];
      datosAntecedentes.forEach((line, index) =>
        doc.text(line, 10, startYAntecedentes + 10 + index * 6)
      );

      // Tabla del historial de alertas
      const startYAlertas = startYAntecedentes + 10 + datosAntecedentes.length * 6 + 20;
      doc.setFont("helvetica", "bold"); 
      doc.setFontSize(14);
      doc.text("Historial de Alertas", 10, startYAlertas);
      doc.setFont("helvetica", "normal");
      doc.autoTable({
        startY: startYAlertas + 10,
        head: [["Fecha Inicio", "Fecha Fin", "Estado", "Valor Detectado", "Gravedad", "Tipo Sensor"]],
        body: historialData.map((historial) => [
          new Date(historial.Fecha_Inicio).toLocaleString(),
          new Date(historial.Fecha_Fin).toLocaleString(),
          historial.Estado,
          historial.Valor_Detectado,
          historial.Gravedad,
          historial.Tipo_Sensor,
        ]),
      });

      // Finaliza el PDF
      doc.save("reporte_neonato.pdf");

      this.setState({
        showModal: true,
        modalMessage: "Reporte generado con éxito.",
      });
    } catch (err) {
      console.error("Error al generar el PDF:", err);
      this.setState({
        showModal: true,
        modalMessage: "Hubo un error al generar el reporte.",
      });
    }
  };

  closeModal = () => {
    this.setState({ showModal: false, modalMessage: "" });
  };

  render() {
    const { showModal, modalMessage } = this.state;
    return (
      <div className="container-fluid mt-4">
        {/* Descripción */}
        <div className="mb-4">
          <h1 className="h3 mb-3 font-weight-normal">Reporte de Interés</h1>
          <p className="text-justify">
            Genera un reporte detallado para el médico o interesados, proporcionando información clave sobre el comportamiento de los signos vitales del neonato en la última semana.
          </p>
        </div>

        {/* Botón para generar el reporte */}
        <div className="text-center">
          <button className="btn btn-primary btn-lg" onClick={this.handleGenerarReporte}>
            Generar y Descargar Reporte
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Notificación</h5>
                  <button type="button" className="close" onClick={this.closeModal}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>{modalMessage}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={this.closeModal}>
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Reporte;
