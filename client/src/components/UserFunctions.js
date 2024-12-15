import axios from "axios";
import jwt_decode from "jwt-decode";

export const register = async (Contacto) => {
  try {
    const response = await axios
      .post(
        "https://auth-db1783.hstgr.io/users/register",
        { Contacto },
        {
          headers: {
            "Content-Type": "application/json",
            "Content-Length": JSON.stringify({ Contacto }).length,
          },
        }
      );
    console.log("Registro exitoso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al registrar usuario:", error.response || error);
    throw error;
  }
};

// Autenticación usando la tabla usuario
export const login = async (user) => {
  
  console.log("login:", user);
  try {
    const response = await axios
      .post(
        "https://auth-db1783.hstgr.io/users/login", 
        JSON.stringify(user),
        { 
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    // Guardar el token de usuario en localStorage
    console.log("token:", response.data.token);
    localStorage.setItem("usertoken", response.data.token);
    console.log("Token decodificado:", jwt_decode(response.data.token));
    return response.data;
  } catch (err) {
    console.error("Error durante el login:", err);
  }
};


// Función para obtener todos los contactos
export const getAllContacts = async () => {
  try {
    // Obtener el token del localStorage
    const token = localStorage.getItem("usertoken");

    // Verificar si hay un token
    if (!token) {
      console.error("No se encontró un token en el localStorage.");
      return null;
    }
    
    // Realizar la solicitud al backend
    const response = await axios.get("https://auth-db1783.hstgr.io/users/contactos", {
      headers: {
        Authorization: token, // Enviar el token en los headers
      },
    });

    // Devolver los contactos obtenidos
    console.log("Contactos obtenidos:", response);
    return response.data;
  } catch (err) {
    console.error("Error al obtener los contactos:", err);
    throw err;
  }
};


// Función para obtener los datos del neonato
export const getNeonatoData = async () => {
  const token = localStorage.getItem("usertoken");

  if (!token) {
    throw new Error("Token no encontrado. Inicie sesión nuevamente.");
  }

  try {
    const response = await axios.get("https://auth-db1783.hstgr.io/users/neonato", {
      headers: { Authorization: token },
    });
    console.log("retorna:",response);
    return response.data;
  } catch (err) {
    console.error("Error al obtener los datos del neonato:", err);
    throw err;
  }
};

// Función para cargar datos del neonato
export const createNeonato = async (newNeonato) => {
  console.log("LLEGA1:", newNeonato);
  const token = localStorage.getItem("usertoken");
  if (!token) {
    throw new Error("Token no encontrado. Inicie sesión nuevamente.");
  }
  try {
    const response = await axios
      .post("https://auth-db1783.hstgr.io/users/newneonato", newNeonato, {
        headers: { Authorization: token },
      });
    console.log("LLEGA2:", response);
    return response.data;
  } catch (err) {
    console.error("Error al registrar el neonato:", err);
    throw err;
  }
};


// Función para obtener los datos del antecedentes
export const getAntecedentesData = async () => {
  const token = localStorage.getItem("usertoken");

  if (!token) {
    throw new Error("Token no encontrado. Inicie sesión nuevamente.");
  }

  try {
    const response = await axios.get("https://auth-db1783.hstgr.io/users/antecedentes", {
      headers: { Authorization: token },
    });
    console.log("retorna:",response);
    return response.data;
  } catch (err) {
    console.error("Error al obtener los datos del antecedentes:", err);
    throw err;
  }
};

// Función para cargar datos de antecedentes
export const createAntecedentes = async (newAntecedentes) => {
  console.log("LLEGA1:", newAntecedentes);
  const token = localStorage.getItem("usertoken");
  if (!token) {
    throw new Error("Token no encontrado. Inicie sesión nuevamente.");
  }
  try {
    const response = await axios
      .post("https://auth-db1783.hstgr.io/users/newantecedentes", newAntecedentes, {
        headers: { Authorization: token },
      });
    console.log("LLEGA2:", response);
    return response.data;
  } catch (err) {
    console.error("Error al registrar el neonato:", err);
    throw err;
  }
};

// Función para obtener el historial
export const getHistorial = async () => {
  try {
    // Obtener el token del localStorage
    const token = localStorage.getItem("usertoken");

    // Verificar si hay un token
    if (!token) {
      console.error("No se encontró un token en el localStorage.");
      return null;
    }
    
    // Realizar la solicitud al backend
    const response = await axios.get("https://auth-db1783.hstgr.io/users/historial", {
      headers: {
        Authorization: token, // Enviar el token en los headers
      },
    });

    // Devolver los historial obtenidos
    console.log("Historial obtenidos:", response);
    return response.data;
  } catch (err) {
    console.error("Error al obtener el historial:", err);
    throw err;
  }
};

// Función para obtener los datos del usuario logeado
export const getUserData = async () => {
  try {
    // Obtener el token del localStorage
    const token = localStorage.getItem("usertoken");
    console.log("token:", token);
    console.log("Token decodificado:", jwt_decode(token));
    const decoded = jwt_decode(token);
      const idUsuario = decoded.idUsuario; // Asegúrate de que el payload del token incluya "idUsuario"

      console.log("idUsuario desde el token:", idUsuario);
    // Verificar si hay un token
    if (!token) {
      console.error("No se encontró un token en el localStorage.");
      return null;
    }
  try {
    const response = await axios.get(`https://auth-db1783.hstgr.io/users/usuario/${idUsuario}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Datos del usuario obtenidos:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error.response || error);
    throw error;
  }
} catch (err) {
  console.error("Error al obtener el historial:", err);
  throw err;
}
};

// Función para editar los datos del usuario logeado
export const editUserData = async (idUsuario, updatedData) => {
  try {
    const token = localStorage.getItem("usertoken");
    if (!token) {
      console.error("No se encontró un token en el localStorage.");
      return null;
    }

    const response = await axios.put(
      `https://auth-db1783.hstgr.io/users/editUsuario/${idUsuario}`,
      updatedData, // Objeto con los campos a editar
      {
        headers: {
          Authorization: `Bearer ${token}`, // Si usas autenticación
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Respuesta del servidor:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al editar los datos del usuario:", error.response || error);
    throw error;
  }
};

//Funcion para eliminar usuario logeado
export const deleteUserAccount = async (idUsuario, password) => {
  const token = localStorage.getItem("usertoken"); 
  console.log("ruta",password);
  if (!token) {
    throw new Error("Token no encontrado. Por favor, inicia sesión.");
  }

  try {
    const response = await axios.post(
      `https://auth-db1783.hstgr.io/users/delete/${idUsuario}`,
      { password }, // Enviar la contraseña en el cuerpo de la solicitud
      { headers: { Authorization: token } }
    );
    return response.data; // Retorna el mensaje del servidor
  } catch (err) {
    console.error("Error al eliminar la cuenta:", err.response || err);
    throw (err.response && err.response.data && err.response.data.error) || 
      "Hubo un problema al eliminar la cuenta. Inténtalo más tarde.";
  }
};


// Función para obtener alertas filtradas por rango de fechas
export const getAlertasFiltradas = async (fechaInicio, fechaFin) => {
  const token = localStorage.getItem("usertoken");

  if (!token) {
    throw new Error("Token no encontrado. Inicie sesión nuevamente.");
  }

  try {
    const response = await axios.get("https://auth-db1783.hstgr.io/users/alertas", {
      headers: { Authorization: token },
      params: { Fecha_Inicio: fechaInicio, Fecha_Fin: fechaFin },
    });
    console.log("Datos de alertas filtradas:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error al obtener alertas filtradas:", err);
    throw err;
  }
};

// Función para actualizar datos de un neonato
export const updateNeonato = async (id, updatedData) => {
  try {
    const token = localStorage.getItem("usertoken");
    if (!token) {
      throw new Error("Token no encontrado. Inicie sesión nuevamente.");
    }

    const response = await axios.put(
      `https://auth-db1783.hstgr.io/users/editNeonato/${id}`, // URL con el ID
      updatedData, // Datos enviados en el cuerpo de la solicitud
      {
        headers: {
          "Content-Type": "application/json", // Encabezado para JSON
          Authorization: `Bearer ${token}`, // Encabezado de autorización
        },
      }
    );

    return response.data; // Respuesta del servidor
  } catch (err) {
    console.error("Error al actualizar los datos del neonato:", err);
    throw err;
  }
};

// Función para actualizar datos de un neonato
export const updateAntecedenteMedico = async (id, updatedData) => {
  try {
    const token = localStorage.getItem("usertoken");
    if (!token) {
      throw new Error("Token no encontrado. Inicie sesión nuevamente.");
    }

    const response = await axios.put(
      `https://auth-db1783.hstgr.io/users/editAntecedenteMedico/${id}`, // URL con el ID
      updatedData, // Datos enviados en el cuerpo de la solicitud
      {
        headers: {
          "Content-Type": "application/json", // Encabezado para JSON
          Authorization: `Bearer ${token}`, // Encabezado de autorización
        },
      }
    );

    return response.data; // Respuesta del servidor
  } catch (err) {
    console.error("Error al actualizar los datos del antecedenteMedico:", err);
    throw err;
  }
};

// Función para generar el reporte
export const generarReporte = async () => {
  const token = localStorage.getItem("usertoken");

  if (!token) {
    throw new Error("Token no encontrado. Inicie sesión nuevamente.");
  }

  try {
    const response = await axios.get("https://auth-db1783.hstgr.io/generarReporte", {
      headers: { Authorization: token },
    });
    return response.data.reporte; // Devuelve el reporte al frontend
  } catch (err) {
    console.error("Error al generar el reporte:", err);
    throw err;
  }
};


// Función para el estado de los sensores
export const getSensores = async () => {
  try {
    const token = localStorage.getItem("usertoken");
    if (!token) {
      console.error("No se encontró un token en el localStorage.");
      return null;
    }

    const response = await axios.get("https://auth-db1783.hstgr.io/users/sensores", {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (err) {
    console.error("Error al obtener los sensores:", err);
    throw err;
  }
};



// Función para obtener los últimos registros de signos vitales
export const getLatestSignosVitales = async () => {
  try {
    const response = await axios.get("https://auth-db1783.hstgr.io/users/latest-signos-vitales");
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 404) {
      console.warn("No se encontraron signos vitales.");
      return [];
    } else {
      const error = new Error(`Error al obtener signos vitales: Status ${response.status}`);
      error.response = response;
      throw error;
    }
  } catch (err) {
    console.error("Error al obtener los últimos registros de signos vitales:", err);
    throw err;
  }
};

// Función para obtener la última alerta
export const getAlertas = async () => {
  try {
    const token = localStorage.getItem("usertoken");
    if (!token) {
      console.error("No se encontró un token en el localStorage.");
      return null;
    }
    const response = await axios.get("/users/latest-alertas", {
      headers: {
        Authorization: token,
      },
    });
    console.log("uf",response.data);
    return response.data || null;
  } catch (err) {
    console.error("Error al obtener la última alerta:", err);
    throw err;
  }
};