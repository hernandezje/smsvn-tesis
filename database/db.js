const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost", // Cambia por tu host
  user: "root",      // Cambia por tu usuario
  password: "",      // Cambia por tu contraseña
  database: "babyhelpbd", // Cambia por el nombre de tu base de datos
});

// Probar la conexión
db.getConnection((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conexión a la base de datos exitosa");
  }
});

module.exports = db;
