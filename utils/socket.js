import { io } from "socket.io-client";

// Change this to your backend URL
const SOCKET_URL = `${process.env.EXPO_PUBLIC_BASE_URL}`;

let socket;

export const initializeSocket = (token) => {
  if (!socket || !socket.connected) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"], // Best for React Native
      auth: {
        token: token, // Pass JWT token for authentication
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connection", () => {
      console.log("✅ Connected to socket server", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log("❌ Connection Error: ", err.message);
    });

    socket.on("disconnect", () => {
      console.log("⚠️ Disconnected from server");
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("🔌 Socket disconnected manually");
  }
};
