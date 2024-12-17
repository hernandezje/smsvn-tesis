const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const setupWebSocket = require("./socket");
const Users = require("./routes/Users");

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: 'https://babyhelp.site', // El dominio de tu frontend
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

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

const options = {
  key: fs.readFileSync('./server.key'),  // Ruta al archivo de clave privada
  cert: fs.readFileSync('./server.crt')  // Ruta al archivo de certificado
};
app.use(cors(corsOptions));

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en https://78.142.242.115:${PORT}`);
});
