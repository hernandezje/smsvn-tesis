import React, { useEffect, useState } from "react";
import { getSensores } from "./UserFunctions";
import { subscribeToSensores } from "./socket";

const SensoresMonitor = () => {
  const [sensores, setEstadoSensores] = useState([]);

  useEffect(() => {
    const fetchLatestEstadoSensores = async () => {
      try {
        const latestData = await getSensores();
        setEstadoSensores(latestData);
      } catch (err) {
        console.error("Error al cargar signos vitales iniciales:", err);
      }
    };

    fetchLatestEstadoSensores();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToSensores((data) => {
      setEstadoSensores(data);
    });

    return () => unsubscribe;
  }, []);
  

  const getColorByEstado = (estado) => {
    switch (estado) {
      case 'inactivo': return 'red';
      case 'activo': return 'green';
      default: return 'black';
    }
  }

  return (
    <div>
     <h5 className="mb-3">Sensores</h5>
      {sensores.length === 0 ? (
        <p>No hay datos de sensores disponibles.</p>
      ) : (
        <table className="table table-bordered text-center">
            <thead className="thead" >
            <tr>
              <th  className="cb">Tipo de Sensor</th>
              <th  className="cb">Estado</th>
            </tr>
          </thead>
          <tbody>
            {sensores.map((sensor) => {
              const rowStyle = {
                backgroundColor: sensor.Estado === 'Anormal' ? '#FFFFE0' : // Amarillo suave
                                 sensor.Estado === 'Crítico' ? '#FFD700' : // Amarillo dorado
                                 'white' // blanco por defecto
              };
              return (
                <tr key={sensor.idSensor} style={rowStyle}>
                  <td>{sensor.Tipo_Sensor}</td>
                  <td style={{ color: getColorByEstado(sensor.Estado) }}>{sensor.Estado}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SensoresMonitor;