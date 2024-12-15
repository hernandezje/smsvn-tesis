const { Server } = require("socket.io");
const { getLatestSignosVitales, getAllSensores, getAlertas } = require("./models/User");

function setupWebSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "https://srv1783.hstgr.io:3306", 
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    const emitirSignosVitales = async () => {
      try {
        const latestData = await getLatestSignosVitales();
        socket.emit("signosVitales", latestData);
      } catch (err) {
        console.error("Error al obtener signos vitales:", err);
      }
    };

    const emitirAlertas = async () => {
      try {
        const nuevasAlertas = await getAlertas();
        if (nuevasAlertas) {
          socket.emit("alertasActualizadas", nuevasAlertas);
        }
      } catch (error) {
        console.error("Error al obtener nuevas alertas:", error);
      }
    };
    
    const emitirSensores = async () => {
      try {
        const sensores = await getAllSensores();
        socket.emit("sensoresActualizados", sensores);
      } catch (err) {
        console.error("Error al obtener sensores:", err);
      }
    };
    
    const intervalSensores = setInterval(emitirSensores, 5000); // Emitir datos cada 5 segundos
    const intervalSignosVitales = setInterval(emitirSignosVitales, 5000);
    const intervalAlertas = setInterval(emitirAlertas, 2000); // Verifica nuevas alertas cada 2 segundos

    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
      clearInterval(intervalSignosVitales);
      clearInterval(intervalAlertas);
      clearInterval(intervalSensores);
    });
  });
}


module.exports = setupWebSocket;
