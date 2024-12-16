const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const setupWebSocket = require("./socket");
const Users = require("./routes/Users");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Ruta principal para usuarios
app.use("/users", Users);
// Ruta de prueba
app.get('/test/a', (req, res) => {
  res.send('Ruta /test/a alcanzada correctamente');
});


// Crear el servidor HTTP
const server = http.createServer(app);

// Configurar WebSocket
setupWebSocket(server);

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
});
