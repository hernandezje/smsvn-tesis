import React, { useState, useEffect } from "react";
import { getHistorial } from "./UserFunctions"; // Asegúrate de importar correctamente la función

const Historial = () => {
  const [historial, setHistorial] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("usertoken");

    if (token) {
      getHistorial()
        .then((data) => {
          setHistorial(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener el historial:", error);
          setIsLoading(false);
        });
    } else {
      console.error("No se encontró el token.");
    }
  }, []);

  const formatDate = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date();
    return date.toLocaleString("es-AR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };
  const formatFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    const hora = String(fecha.getHours()).padStart(2, "0");
    const minutos = String(fecha.getMinutes()).padStart(2, "0");
    const segundos = String(fecha.getSeconds()).padStart(2, "0");
  
    return `${anio}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
  };
  
  const handleAlertRedirect = (fechaInicio, fechaFin) => {
    const fechaInicioFormatted = formatFecha(fechaInicio);
    const fechaFinFormatted = fechaFin
      ? formatFecha(fechaFin)
      : formatFecha(new Date().toISOString());
  
    window.location.href = `/alertas?fechaInicio=${fechaInicioFormatted}&fechaFin=${fechaFinFormatted}`;
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-3 font-weight-normal">Historial</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th className="cb">Fecha Inic.</th>
              <th className="cb">Fecha Fin</th>
              <th className="cb">Estado</th>
              <th className="cb">Alertas</th>
            </tr>
          </thead>
          <tbody>
            {historial.length > 0 ? (
              historial.map((item, index) => (
                <tr key={index}>
                  <td>{formatDate(item.Fecha_Inicio)}</td>
                  <td>{formatDate(item.Fecha_Fin)}</td>
                  <td>{item.Estado}</td>
                  <td>
                    {item.Estado !== "Normal" && (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() =>
                          handleAlertRedirect(
                            item.Fecha_Inicio,
                            item.Fecha_Fin
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
                <td colSpan="4" className="text-center">
                  No hay historial disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Historial;
