const express = require("express");
const Users = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { createContact, createUser, findUserByUsuario, getAllContacts, getNeonatoData, getAntecedentesData, createNeonato, 
  createAntecedentes, getAllHistorial, getLoggedInUserInfo, updateUserInDB, getUserPassword, deleteUser, getAlertasFiltradas, 
  updateNeonato, updateAntecedenteMedico, getReportData, getAllSensores, getLatestSignosVitales, getAlertas  } = require("../models/User");

process.env.SECRET_KEY = "secret";

// Middleware para manejar grandes tamaños de datos (asegúrate de configurarlo en `app.js` o `server.js`):
Users.use(express.json({ limit: "50mb" }));
Users.use(express.urlencoded({ limit: "50mb", extended: true }));

// Ruta para registrar un nuevo usuario
Users.post("/register", (req, res) => {
  const { DNI, Nombre_Apellido, Telefono, Parentezco, Progenitor, Direccion, Usuario, Clave, Email } = req.body.Contacto;

  // Establecer un encabezado en la respuesta
  res.setHeader("Content-Type", "application/json");

  // Crear un contacto
  createContact({ DNI, Nombre_Apellido, Telefono, Parentezco, Progenitor, Direccion }, (err, contact) => {
    if (err) {
      return res.status(500).json({ error: "Error al crear el contacto" });
    }

    // Hashear la contraseña
    bcrypt.hash(Clave, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ error: "Error al encriptar la contraseña" });
      }
      
      // Crear un usuario vinculado al contacto
      createUser({ Usuario, Clave: hash, Email, Contacto_idContacto: contact.idContacto }, (err, user) => {
        if (err) {
          return res.status(500).json({ error: "Error al crear el usuario" });
        }

        res.json({ message: "Usuario registrado exitosamente", idUsuario: user.idUsuario });
      });
    });  
  });
});

// Ruta para autenticar un usuario
Users.post("/login", async (req, res) => {
  const { Usuario, Clave } = req.body;
  try {
    // Buscar el usuario en la base de datos
    const user = await findUserByUsuario(Usuario);

    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    // Verificar la contraseña hasheada
    const isMatch = await bcrypt.compare(Clave, user.Clave);

    if (!isMatch) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    // Crear el token JWT con idUsuario incluido en el payload
    const payload = { idUsuario: user.idUsuario, Usuario: user.Usuario }; // Incluimos idUsuario
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });

    // Enviar el token al cliente
    res.json({ token });
  } catch (err) {
    console.error("Error durante la autenticación:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});



// Ruta para obtener todos los contactos
Users.get("/contactos", async (req, res) => {
  try {
    // Llamar a la función del modelo para obtener los contactos
    const contacts = await getAllContacts();

    // Verificar si hay contactos
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ error: "No se encontraron contactos" });
    }

    // Responder con los contactos obtenidos
    res.json(contacts);
  } catch (err) {
    console.error("Error al obtener los contactos:", err);
    res.status(500).json({ error: "Error interno del servidorES" });
  }
});


// Ruta para obtener los datos del neonato
Users.get("/neonato", async (req, res) => {
 try {
    const datos = await getNeonatoData();
    if (!datos) {
      return res.json(null); // Devuelve null si no hay datos disponibles
    }
    res.json(datos);
  } catch (err) {
    console.error("Error al obtener datos del neonato:", err);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// Ruta para cargar los datos del neonato
Users.post("/newneonato", (req, res) => {
  // Extraer los datos del cuerpo de la solicitud
  const { DNI, Nombre_Apellido, Sexo, Fecha_Nac, Peso, Altura, Grupo_Sanguineo, Condicion_Nac } = req.body;

  // Establecer el encabezado de respuesta
  res.setHeader("Content-Type", "application/json");

  // Llamar a la función createNeonato
  createNeonato(
    { DNI, Nombre_Apellido, Sexo, Fecha_Nac, Peso, Altura, Grupo_Sanguineo, Condicion_Nac },
    (err, result) => {
      if (err) {
        console.error("Error al crear el neonato:", err);
        return res.status(500).json({ error: "Error al crear el neonato" });
      }

      // Responder con éxito
      res.status(201).json({
        message: "Neonato creado exitosamente",
        result,
      });
    }
  );
});


// Ruta para obtener los datos del antecedentes
Users.get("/antecedentes", async (req, res) => {
  try {
    const datos = await getAntecedentesData();
    if (!datos) {
      return res.json(null); // Devuelve null si no hay datos disponibles
    }
    res.json(datos);
  } catch (err) {
    console.error("Error al obtener datos del antecedentes:", err);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// Ruta para cargar los antecedentes del neonato
Users.post("/newantecedentes", (req, res) => {
  // Extraer los datos del cuerpo de la solicitud
  const { Adicciones, Descripcion_Adic, Patologias, Descripcion_Pat, Recibe_Tratamiento, Descripcion_Tratam, Alergias, Descripcion_Aler, Vacunas, Descripcion_Vac } = req.body;

  // Establecer el encabezado de respuesta
  res.setHeader("Content-Type", "application/json");

  // Llamar a la función createAntecedentes
  createAntecedentes(
    { Adicciones, Descripcion_Adic, Patologias, Descripcion_Pat, Recibe_Tratamiento, Descripcion_Tratam, Alergias, Descripcion_Aler, Vacunas, Descripcion_Vac },
    (err, result) => {
      if (err) {
        console.error("Error al crear los antecedentes medicos:", err);
        return res.status(500).json({ error: "Error al crear los antecedentes" });
      }

      // Responder con éxito
      res.status(201).json({
        message: "Antecedentes medicos creado exitosamente",
        result,
      });
    }
  );
});

// Ruta para obtener el historial
Users.get("/historial", async (req, res) => {
  try {
    // Llamar a la función del modelo para obtener historial
    const historial = await getAllHistorial();

    // Verificar si hay historial
    if (!historial || historial.length === 0) {
      return res.status(404).json({ error: "No se encontraron datos en el historial" });
    }

    // Responder con  historial obtenidos
    res.json(historial);
  } catch (err) {
    console.error("Error al obtener el historial:", err);
    res.status(500).json({ error: "Error interno del servidorES" });
  }
});

// Ruta para obtener  informacion de usuario
Users.get("/usuario/:idUsuario", async (req, res) => {
  try {
    const { idUsuario } = req.params;

    // Obtener la información del usuario desde el modelo
    const userInfo = await getLoggedInUserInfo(idUsuario);

    if (!userInfo) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Excluir contraseña encriptada antes de devolver los datos
    delete userInfo.EncryptedPassword;

    res.json({ user: userInfo });
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


//ruta para modificar usuario logeado
Users.put("/editUsuario/:idUsuario", async (req, res) => {
  try {
    const { idUsuario } = req.params; // ID del usuario
    const updatedData = req.body; // Datos a actualizar

    // Validar que se envíen campos para actualizar
    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ error: "No se proporcionaron datos para actualizar." });
    }

    // Actualizar los datos en la base de datos
    const result = await updateUserInDB(idUsuario, updatedData);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado o sin cambios realizados." });
    }

    res.json({ message: "Usuario actualizado con éxito." });
  } catch (error) {
    console.error("Error al editar los datos del usuario:", error.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});



//Ruta para Eliminar usuario logeado
Users.post("/delete/:idUsuario", async (req, res) => {
  try {
    const { idUsuario } = req.params;
    const { password } = req.body;
    console.log("ruta",password);

    if (!password) {
      return res.status(400).json({ error: "Se requiere la clave para eliminar la cuenta." });
    }

    // Obtener la contraseña encriptada desde el modelo
    const hashedPassword = await getUserPassword(idUsuario);
    if (!hashedPassword) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Comparar la contraseña proporcionada con la almacenada
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ error: "La clave es incorrecta." });
    }

    // Eliminar el usuario
    const result = await deleteUser(idUsuario);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No se pudo eliminar la cuenta. Inténtalo más tarde." });
    }

    res.json({ message: "Cuenta eliminada con éxito." });
  } catch (err) {
    console.error("Error al eliminar la cuenta:", err.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// Ruta para obtener alertas filtradas por fechas
Users.get("/alertas", async (req, res) => {
  const { fechaInicio, fechaFin } = req.query;
  
  // Verificar que las fechas estén presentes
  if (!fechaInicio || !fechaFin) {
    return res.status(400).json({ error: "Las fechas de inicio y fin son requeridas." });
  }

  try {
    // Llamar a la función que consulta la base de datos y devuelve las alertas filtradas
    const alertas = await getAlertasFiltradas(fechaInicio, fechaFin);
    res.json(alertas); // Devolver las alertas filtradas al frontend
  } catch (err) {
    console.error("Error al obtener alertas filtradas:", err);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
});


// Ruta para actualizar datos del neonato
Users.put("/editNeonato/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const neonatoData = req.body;

    const result = await updateNeonato(id, neonatoData);

    if (!result) {
      return res.status(404).json({ error: "Neonato no encontrado." });
    }

    res.json({ message: "Datos del neonato actualizados correctamente." });
  } catch (err) {
    console.error("Error al actualizar datos del neonato:", err);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});


// Ruta para actualizar datos del neonato
Users.put("/editAntecedenteMedico/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const antecedenteMedico = req.body;

    const result = await updateAntecedenteMedico(id, antecedenteMedico);

    if (!result) {
      return res.status(404).json({ error: "Neonato no encontrado." });
    }

    res.json({ message: "Datos del neonato actualizados correctamente." });
  } catch (err) {
    console.error("Error al actualizar datos del neonato:", err);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});


// Ruta para generar el reporte
Users.get("/generarReporte", async (req, res) => {
  try {
    const reportData = await getReportData();

    if (!reportData || reportData.length === 0) {
      return res.status(404).json({ message: "No se encontraron datos para el reporte." });
    }

    res.json({ reporte: reportData });
  } catch (err) {
    console.error("Error al generar el reporte:", err);
    res.status(500).json({ error: "Error interno del servidor al generar el reporte." });
  }
});


// Ruta para obtener el estado de los sensores
Users.get("/sensores", async (req, res) => {
  try {
    // Llamar a la función del modelo para obtener sensores
    const sensores = await getAllSensores();

    // Verificar si hay sensores
    if (!sensores || sensores.length === 0) {
      return res.status(404).json({ error: "No se encontraron datos en sensores" });
    }

    // Responder con los sensores
    res.json(sensores);
  } catch (err) {
    console.error("Error al obtener el estado de los sensores:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


// Ruta para obtener estado de los signos vitales
Users.get("/latest-signos-vitales", async (req, res) => {
  try {
    const latest = await getLatestSignosVitales();
    if (latest.length === 0) {
      return res.status(404).json({ error: "No se encontraron registros" });
    }
    res.json(latest);
  } catch (err) {
    console.error("Error al obtener los últimos registros de signos vitales:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para obtener alertas
Users.get("/latest-alertas", async (req, res) => {
  try {
    const alerta = await getAlertas(); // Obtén la alerta
    if (!alerta) {
      return res.status(404).json({ error: "No se encontraron alertas" });
    }
    console.log("Datos enviados:", alerta); // Debug
    res.json(alerta); // Enviar el objeto directamente
  } catch (err) {
    console.error("Error al obtener las alertas:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


module.exports = Users;
