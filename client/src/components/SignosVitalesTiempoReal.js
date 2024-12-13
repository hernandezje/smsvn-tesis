import React, { useEffect, useState } from "react";
import { getLatestSignosVitales } from "./UserFunctions";
import { subscribeToSignosVitales } from "./socket";

const SignosVitalesMonitor = () => {
  const [signosVitales, setSignosVitales] = useState([]);

  useEffect(() => {
    const fetchLatestSignosVitales = async () => {
      try {
        const latestData = await getLatestSignosVitales();
        setSignosVitales(latestData);
      } catch (err) {
        console.error("Error al cargar signos vitales iniciales:", err);
      }
    };

    fetchLatestSignosVitales();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToSignosVitales((data) => {
      setSignosVitales(data);
    });

    return () => unsubscribe;
  }, []);
  

  const getColorByEstado = (estado) => {
    switch (estado) {
      case 'Normal': return 'green';
      case 'Anormal': return '#FFD700'; // Amarillo dorado
      case 'Crítico': return 'red';
      default: return 'black';
    }
  }

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


  return (
    <div>
      <h5 className="mb-3">Signos Vitales</h5>
      {signosVitales.length === 0 ? (
        <p>No hay datos disponibles.</p>
      ) : (
        <table className="table table-bordered text-center">
            <thead className="thead" >
            <tr>
              <th className="cb">Fecha-Hora</th>
              <th className="cb">Signo</th>
              <th className="cb">Medición</th>
            </tr>
          </thead>
          <tbody>
            {signosVitales.map((registro) => (
              <tr key={registro.idSignos_Vitales}> {/* Usa un ID único */}
                <td>{formatDate(registro.Fecha_Hora)}</td> {/* Formato de fecha aquí */}
                <td>{registro.Tipo_Sensor}</td>
                <td style={{ color: getColorByEstado(registro.Estado) }}>{registro.Medicion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SignosVitalesMonitor;