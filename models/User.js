const db = require("../database/db");
const mysql = require('mysql2/promise');

// Crear un nuevo contacto
const createContact = (contactData, callback) => {
  const { DNI, Nombre_Apellido, Telefono, Parentezco, Progenitor, Direccion } = contactData;
  const query = `
    INSERT INTO contacto 
    (DNI, Nombre_Apellido, Telefono, Parentezco, Progenitor, Direccion) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [DNI, Nombre_Apellido, Telefono, Parentezco, Progenitor, Direccion],
    (err, result) => {
      if (err) {
        console.error("Error al registrar el contacto_:", err.message);
        return callback(err, null);
      }
      callback(null, { idContacto: result.insertId });
    }
  );
};

// Crear un nuevo usuario vinculado a un contacto
const createUser = (userData, callback) => {
  const { Usuario, Clave, Email, Contacto_idContacto } = userData;
  const query = `
    INSERT INTO usuario 
    (Usuario, Clave, Email, Contacto_idContacto) 
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [Usuario, Clave, Email, Contacto_idContacto], (err, result) => {
    if (err) {
      console.error("Error al registrar el usuario:", err);
      return callback(err, null);
    }
    callback(null, { idUsuario: result.insertId });
  });
};

// Buscar un usuario por nombre de usuario
const findUserByUsuario = async (Usuario) => {
  const query = `
    SELECT * 
    FROM usuario 
    WHERE Usuario = ?
  `;
  try {
    const [results] = await db.promise().query(query, [Usuario]);
    return results[0];
  } catch (err) {
    console.error("Error al buscar el usuario:", err);
    throw err;
  }
};

// Buscar los contactos cargados
const getAllContacts = async () => {
  const query = `
  SELECT 
  DNI, Nombre_Apellido, Telefono, Parentezco, Direccion 
  FROM contacto
  `;
  try {
    const [results] = await db.promise().query(query);
    return results;
  } catch (err) {
    console.error("Error al obtener los contactos:", err.message);
    throw err;
  }
};


// Función para obtener los datos del neonato desde la base de datos
const getNeonatoData = async () => {
  const query = `
  SELECT  
  idLactante, DNI, Nombre_Apellido, Sexo, Fecha_Nac, Peso, Altura, Grupo_Sanguineo, Condicion_Nac 
  FROM lactante LIMIT 1
  `;
  try {
    const [results] = await db.promise().query(query);
    return results;
  } catch (err) {
    console.error("Error al obtener los contactos:", err.message);
    throw err;
  }
};

// Consulta para cargar los datos del neonato en la base de datos
const createNeonato = (neonatoData, callback) => {
  const { DNI, Nombre_Apellido, Sexo, Fecha_Nac, Peso, Altura, Grupo_Sanguineo, Condicion_Nac } = neonatoData;
  const query = `
    INSERT INTO lactante 
    (DNI, Nombre_Apellido, Sexo, Fecha_Nac, Peso, Altura, Grupo_Sanguineo, Condicion_Nac) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [DNI, Nombre_Apellido, Sexo, Fecha_Nac, Peso, Altura, Grupo_Sanguineo, Condicion_Nac], (err, result) => {
    if (err) {
      console.error("Error al cargar datos del neonato:", err);
      return callback(err, null);
    }
    callback(null, { idLactante: result.insertId });
  });
};


// Función para obtener los antecedentes del neonato desde la base de datos
const getAntecedentesData = async () => {
  const query = `
  SELECT  
  idAntecedente_Medico, Adicciones, Descripcion_Adic, Patologias, Descripcion_Pat, Recibe_Tratamiento, Descripcion_Tratam, Alergias, Descripcion_Aler, Vacunas, Descripcion_Vac
  FROM antecedente_medico LIMIT 1
  `;
  try {
    const [results] = await db.promise().query(query);
    return results;
  } catch (err) {
    console.error("Error al obtener los contactos:", err.message);
    throw err;
  }
};

// Función para cargar los antecedentes del neonato en la base de datos
const createAntecedentes = (antecedentesData, callback) => {
  const { Adicciones, Descripcion_Adic, Patologias, Descripcion_Pat, Recibe_Tratamiento, Descripcion_Tratam, Alergias, Descripcion_Aler, Vacunas, Descripcion_Vac } = antecedentesData;
  const query = `
    INSERT INTO antecedente_medico 
    ( Adicciones, Descripcion_Adic, Patologias, Descripcion_Pat, Recibe_Tratamiento, Descripcion_Tratam, Alergias, Descripcion_Aler, Vacunas, Descripcion_Vac) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [ Adicciones, Descripcion_Adic, Patologias, Descripcion_Pat, Recibe_Tratamiento, Descripcion_Tratam, Alergias, Descripcion_Aler, Vacunas, Descripcion_Vac], (err, result) => {
    if (err) {
      console.error("Error al cargar antecedentes del neonato:", err);
      return callback(err, null);
    }
    callback(null, { 	idAntecedente_Medico: result.insertId });
  });
};


// Buscar el historial
const getAllHistorial = async () => {
  const query = `
  SELECT 
  Fecha_Inicio, Fecha_Fin, Estado
  FROM historial
  `;
  try {
    const [results] = await db.promise().query(query);
    return results;
  } catch (err) {
    console.error("Error al obtener el historial:", err.message);
    throw err;
  }
};


// Buscar datos del usuario logueado
const getLoggedInUserInfo = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        usuario.idUsuario, 
        usuario.Usuario, 
        usuario.Clave AS EncryptedPassword,
        usuario.Email, 
        contacto.DNI,
        contacto.Nombre_Apellido,
        contacto.Telefono,
        contacto.Parentezco,
        contacto.Progenitor,
        contacto.Direccion
      FROM 
        usuario
      INNER JOIN 
        contacto 
      ON 
        usuario.Contacto_idContacto = contacto.idContacto
      WHERE 
        usuario.idUsuario = ?
    `;

    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error al consultar la información del usuario:", err.message);
        return reject(err);
      }

      if (results.length === 0) {
        return resolve(null); // Usuario no encontrado
      }

      resolve(results[0]); // Retornar la información del usuario
    });
  });
};


//Modificar usuario logeado
const updateUserInDB = (idUsuario, updatedData) => {
  return new Promise((resolve, reject) => {
    const { Usuario, Email, DNI, Nombre_Apellido, Telefono, Parentezco, Progenitor, Direccion } = updatedData;

    const userQuery = `
      UPDATE usuario
      SET Usuario = ?, Email = ?
      WHERE idUsuario = ?
    `;
    const contactQuery = `
      UPDATE contacto
      SET DNI = ?, Nombre_Apellido = ?, Telefono = ?, Parentezco = ?, Progenitor = ?, Direccion = ?
      WHERE idContacto = (SELECT Contacto_idContacto FROM usuario WHERE idUsuario = ?)
    `;

    // Obtener conexión del pool
    db.getConnection((err, connection) => {
      if (err) {
        console.error("Error al obtener la conexión:", err.message);
        return reject(err);
      }

      // Iniciar la transacción
      connection.beginTransaction((err) => {
        if (err) {
          connection.release(); // Liberar la conexión si ocurre un error
          console.error("Error al iniciar la transacción:", err.message);
          return reject(err);
        }

        // Ejecutar primera consulta (tabla usuario)
        connection.query(userQuery, [Usuario, Email, idUsuario], (err) => {
          if (err) {
            return connection.rollback(() => {
              connection.release(); // Liberar la conexión en caso de error
              console.error("Error al ejecutar la consulta de usuario:", err.message);
              reject(err);
            });
          }

          // Ejecutar segunda consulta (tabla contacto)
          connection.query(contactQuery, [DNI, Nombre_Apellido, Telefono, Parentezco, Progenitor, Direccion, idUsuario], (err, result) => {
            if (err) {
              return connection.rollback(() => {
                connection.release(); // Liberar la conexión en caso de error
                console.error("Error al ejecutar la consulta de contacto:", err.message);
                reject(err);
              });
            }

            // Confirmar la transacción
            connection.commit((err) => {
              if (err) {
                return connection.rollback(() => {
                  connection.release(); // Liberar la conexión en caso de error
                  console.error("Error al confirmar la transacción:", err.message);
                  reject(err);
                });
              }

              // Liberar conexión y resolver la promesa
              connection.release();
              resolve(result);
            });
          });
        });
      });
    });
  });
};


//Eliminar usuario logeado (2 pasos:verificar contraseña y eliminar usuario)
const getUserPassword = async (idUsuario) => {
  const query = `SELECT Clave FROM usuario WHERE idUsuario = ?`;
  try {
    const [rows] = await db.promise().query(query, [idUsuario]);
    if (rows.length === 0) return null; // Usuario no encontrado
    return rows[0].Clave; // Retorna la contraseña encriptada
  } catch (err) {
    console.error("Error al obtener la clave del usuario:", err.message);
    throw err;
  }
};
const deleteUser = async (idUsuario) => {
  const query = `DELETE FROM usuario WHERE idUsuario = ?`;
  try {
    const [result] = await db.promise().query(query, [idUsuario]);
    return result; // Retorna el resultado de la operación
  } catch (err) {
    console.error("Error al eliminar el usuario:", err.message);
    throw err;
  }
};

//filtrar y traer alertas
const getAlertasFiltradas = (fechaInicio, fechaFin, callback) => {
  const query = `
    SELECT 
      alerta.idAlerta, 
      alerta.Valor_Detectado, 
      alerta.Fecha_Hora, 
      alerta.Gravedad, 
      alerta.Sensor_idSensor,
      sensor.Tipo_Sensor, 
      sensor.Modelo, 
      sensor.Rango_Medicion, 
      sensor.Estado, 
      sensor.Dispositivo_idDispositivo
    FROM alerta
    JOIN sensor ON alerta.Sensor_idSensor = sensor.idSensor
    WHERE alerta.Fecha_Hora BETWEEN ? AND ?
    ORDER BY alerta.Fecha_Hora ASC;
  `;

  db.query(query, [fechaInicio, fechaFin], (err, results) => {
    if (err) {
      console.error("Error al obtener alertas filtradas:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// actualizar datos de un neonato
const updateNeonato = async (idLactante, neonatoData) => {
  const { DNI, Nombre_Apellido, Sexo, Fecha_Nac, Peso, Altura, Grupo_Sanguineo, Condicion_Nac } = neonatoData;

  const query = `
    UPDATE lactante 
    SET 
      DNI = ?, 
      Nombre_Apellido = ?, 
      Sexo = ?, 
      Fecha_Nac = ?, 
      Peso = ?, 
      Altura = ?, 
      Grupo_Sanguineo = ?, 
      Condicion_Nac = ?
    WHERE idLactante = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(query, [DNI, Nombre_Apellido, Sexo, Fecha_Nac, Peso, Altura, Grupo_Sanguineo, Condicion_Nac, idLactante], (err, result) => {
      if (err) {
        console.error("Error al actualizar datos del neonato:", err);
        reject(err);
      } else if (result.affectedRows === 0) {
        resolve(null); // Si no se encontró el neonato
      } else {
        resolve(result);
      }
    });
  });
};

// Actualizar datos de antecedentes médicos
const updateAntecedenteMedico = async (idAntecedente_Medico, antecedenteData) => {
  const { Adicciones, Descripcion_Adic, Patologias, Descripcion_Pat, Recibe_Tratamiento, Descripcion_Tratam, Alergias, Descripcion_Aler, Vacunas, Descripcion_Vac } = antecedenteData;

  const query = `
    UPDATE antecedente_medico 
    SET 
      Adicciones = ?, 
      Descripcion_Adic = ?, 
      Patologias = ?, 
      Descripcion_Pat = ?, 
      Recibe_Tratamiento = ?, 
      Descripcion_Tratam = ?, 
      Alergias = ?, 
      Descripcion_Aler = ?, 
      Vacunas = ?, 
      Descripcion_Vac = ?
    WHERE idAntecedente_Medico = ?
  `;

  return new Promise((resolve, reject) => {
    db.query( query, [ Adicciones, Descripcion_Adic, Patologias, Descripcion_Pat, Recibe_Tratamiento, Descripcion_Tratam, Alergias, Descripcion_Aler, Vacunas, Descripcion_Vac, idAntecedente_Medico ], 
      (err, result) => {
        if (err) {
          console.error("Error al actualizar los datos del antecedente médico:", err);
          reject(err);
        } else if (result.affectedRows === 0) {
          resolve(null); // Si no se encontró el antecedente médico
        } else {
          resolve(result);
        }
      }
    );
  });
};


module.exports = { createContact, createUser, findUserByUsuario, getAllContacts, getNeonatoData, getAntecedentesData, createNeonato, createAntecedentes, getAllHistorial, getLoggedInUserInfo, updateUserInDB, getUserPassword,
  deleteUser, getAlertasFiltradas, updateNeonato, updateAntecedenteMedico};
