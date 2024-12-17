const mysql = require("mysql2");

const db = mysql.createPool({
  host: "srv1783.hstgr.io",         // Host de la base de datos
  user: "u158972839_root",          // Usuario de la base de datos
  password: "tesisBabyhelp369",     // Contraseña de la base de datos
  database: "u158972839_babyhelpbd", // Nombre de la base de datos
  port: 3306,                       // Puerto para MySQL
});

// Probar la conexión
db.getConnection((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err.message);
  } else {
    console.log("Conexión exitosa a la base de datos en Hostinger.");
  }
});

module.exports = db;
