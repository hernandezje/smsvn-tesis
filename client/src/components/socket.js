import { io } from "socket.io-client";

let socket;

export const connectSocket = () => {
    if (!socket) {
        socket = io("http://78.142.242.115:22", { // Cambiado a 5000 para el servidor 
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelayMax: 10000,
      });
    }
    return socket;
  };

export const subscribeToSignosVitales = (callback) => {
    const mySocket = connectSocket();
    mySocket.on("signosVitales", (data) => callback(data));
    return () => mySocket.off("signosVitales");
};

export const subscribeToSensores = (callback) => {
    const mySocket = connectSocket();
    mySocket.on("sensoresActualizados", (data) => callback(data));
    return () => mySocket.off("sensoresActualizados");
};

export const subscribeToAlertas = (callback) => {
    const mySocket = connectSocket();
    mySocket.on("alertasActualizadas", (data) => {
        console.log("Datos recibidos desde el socket:", data);
        callback(data);
    });
    return () => mySocket.off("alertasActualizadas");
};

// Función para desconectar el socket manualmente (opcional)
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};