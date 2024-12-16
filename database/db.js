const mysql = require("mysql2");

const db = mysql.createPool({
  host: "srv1783.hstgr.io", // Cambia por tu host
  user: "u158972839_root",      // Cambia por tu usuario
  password: "tesisBabyhelp_369",      // Cambia por tu contraseña
  database: "u158972839_babyhelpbd", // Cambia por el nombre de tu base de datos
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
