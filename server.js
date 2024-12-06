const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const Users = require("./routes/Users");

app.use(bodyParser.json());
app.use(cors());

// Ruta principal para usuarios
app.use("/users", Users);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:5000`);
});
