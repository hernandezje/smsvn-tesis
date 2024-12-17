import { useEffect, useState } from "react";
import { getAlertasFiltradas } from "./UserFunctions"; // Importa la función

const Alertas = () => {
  const [alertas, setAlertas] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Obtener las fechas de la URL
    const queryParams = new URLSearchParams(window.location.search);
    const fechaInicio = queryParams.get("fechaInicio");
    const fechaFin = queryParams.get("fechaFin");

    // Consultar las alertas filtradas usando userFunction
    const fetchAlertas = async () => {
      try {
        const alertasData = await getAlertasFiltradas(fechaInicio, fechaFin);
        console.log("veamos",fechaInicio,fechaFin)
        setAlertas(alertasData);
      } catch (err) {
        setErrors({ message: err.message });
      }
    };

    fetchAlertas();
  }, []);

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-3 font-weight-normal">Alertas Filtradas</h1>
      {errors.message ? (
        <div className="alert alert-danger text-center">{errors.message}</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-sm">
            <thead className="thead">
              <tr>
                <th scope="col" className="cb">Fecha/Hora</th>
                <th scope="col" className="cb">Sensor</th>
                <th scope="col" className="cb">Medición</th>
                <th scope="col" className="cb">Gravedad</th>
              </tr>
            </thead>
            <tbody>
              {alertas.length > 0 ? (
                alertas.map((alerta) => (
                  <tr key={alerta.idAlerta}>
                    <td>{alerta.Fecha_Hora}</td>
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
        </div>
      )}
    </div>
  );
};

export default Alertas;
