import axios from "axios";
import jwt_decode from "jwt-decode";

export const register = async (Contacto) => {
  try {
    const response = await axios
      .post(
        "http://localhost:5000/users/register",
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
        "http://localhost:5000/users/login", 
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
    const response = await axios.get("http://localhost:5000/users/contactos", {
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
    const response = await axios.get("http://localhost:5000/users/neonato", {
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
      .post("http://localhost:5000/users/newneonato", newNeonato, {
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
    const response = await axios.get("http://localhost:5000/users/antecedentes", {
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
      .post("http://localhost:5000/users/newantecedentes", newAntecedentes, {
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
    const response = await axios.get("http://localhost:5000/users/historial", {
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
    const response = await axios.get(`http://localhost:5000/users/usuario/${idUsuario}`, {
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
      `http://localhost:5000/users/editUsuario/${idUsuario}`,
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
      `http://localhost:5000/users/delete/${idUsuario}`,
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
    const response = await axios.get("http://localhost:5000/users/alertas", {
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

