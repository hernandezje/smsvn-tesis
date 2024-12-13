import React, { useEffect, useState, useRef } from "react";
import { getAlertas } from "./UserFunctions";
import { subscribeToAlertas } from "./socket";

const AlertasMonitor = () => {
  const [alertaActual, setAlertaActual] = useState(null);
  const [estadoNormal, setEstadoNormal] = useState(true);
  const ultimaAlertaRef = useRef(null); // Ref para almacenar la última alerta procesada
  const timerRef = useRef(null); // Ref para manejar el temporizador

  // Función para verificar si la alerta está dentro de los últimos 5 minutos
  const esAlertaReciente = (fechaAlerta) => {
    const fechaActual = new Date();
    const fechaDeAlerta = new Date(fechaAlerta);
    const diferencia = fechaActual - fechaDeAlerta; // Diferencia en milisegundos
    return diferencia >= 0 && diferencia <= 5 * 60 * 1000; // 5 minutos en milisegundos
  };

  useEffect(() => {
    // Obtener la última alerta desde el servidor (solo al cargar la página por primera vez)
    const fetchInitialAlertas = async () => {
      try {
        const latestData = await getAlertas();
        if (latestData && esAlertaReciente(latestData.Fecha_Hora)) {
          setAlertaActual(latestData);
          ultimaAlertaRef.current = latestData;
          setEstadoNormal(false); // Hay una alerta activa
          reiniciarTemporizador(); // Reiniciar temporizador para volver al estado normal
        }
      } catch (error) {
        console.error("Error al cargar la última alerta:", error);
      }
    };

    fetchInitialAlertas();
  }, []);

  useEffect(() => {
    // Suscribirse a las alertas en tiempo real
    const unsubscribe = subscribeToAlertas((data) => {
      if (!data) return;

      // Verificar si la alerta es reciente (dentro de los últimos 5 minutos)
      if (esAlertaReciente(data.Fecha_Hora)) {
        setAlertaActual(data);
        ultimaAlertaRef.current = data; // Guardar la última alerta
        setEstadoNormal(false); // Cambiar a estado de alerta
        reiniciarTemporizador(); // Reiniciar temporizador
      } else {
        setEstadoNormal(true); // Volver a estado normal si la alerta es antigua
        setAlertaActual(null); // Limpiar la alerta actual
      }
    });

    return () => unsubscribe(); // Limpiar la suscripción al desmontar el componente
  }, []);

  const reiniciarTemporizador = () => {
    // Reiniciar el temporizador para volver al estado normal después de 5 minutos
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setEstadoNormal(true); // Cambiar a estado normal
      setAlertaActual(null); // Limpiar la alerta actual
    }, 5 * 60 * 1000); // 5 minutos en milisegundos
  };

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

  const getColorByGravedad = (gravedad) => {
    switch (gravedad) {
      case "Leve":
        return "yellow";
      case "Moderada":
        return "#FFD700";
      case "Grave":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <div>
      {!estadoNormal && alertaActual ? (
        <div className="text-center bg-light py-3 mb-4">
          <h3 className="text-danger">
            <strong>¡ALERTA!</strong>
          </h3>
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th>Fecha-Hora</th>
                <th>Sensor</th>
                <th>Medición</th>
                <th>Gravedad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {alertaActual.Fecha_Hora &&
                    formatDate(alertaActual.Fecha_Hora)}
                </td>
                <td style={{ color: getColorByGravedad(alertaActual.Gravedad) }}>
                  {alertaActual.Tipo_Sensor}
                </td>
                <td style={{ color: getColorByGravedad(alertaActual.Gravedad) }}>
                  {alertaActual.Valor_Detectado}
                </td>
                <td style={{ color: getColorByGravedad(alertaActual.Gravedad) }}>
                  {alertaActual.Gravedad}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center bg-light py-3 mb-4">
          <h3>
            <strong>Estado:</strong>{" "}
            <span className="text-success">Normal!</span>
          </h3>
        </div>
      )}
    </div>
  );
};

export default AlertasMonitor;
