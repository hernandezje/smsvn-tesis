import React, { useState, useEffect } from "react";
import { getHistorial } from "./UserFunctions"; // Asegúrate de importar correctamente la función

const Historial = () => {
  const [historial, setHistorial] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("usertoken");

    if (token) {
      getHistorial() // Usar la función getHistorial importada
        .then((data) => {
          setHistorial(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener el historial:", error);
          setIsLoading(false);
        });
    } else {
      // Si no hay token, podrías redirigir o manejar el error aquí
      console.error("No se encontró el token.");
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
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

  const handleAlertRedirect = (fechaInicio, fechaFin) => {
    // Aquí puedes implementar redirección u otro comportamiento según el estado
    // En lugar de history.push, podrías usar alguna lógica propia.
    console.log(`Redirigiendo a alertas con fechas: ${fechaInicio} - ${fechaFin}`);
  };

  if (isLoading) {
    return <p>Cargando historial...</p>;
  }

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
                          handleAlertRedirect(item.Fecha_Inicio, item.Fecha_Fin)
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
