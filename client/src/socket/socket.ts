import { io } from "socket.io-client";

//initializing socket.io
export const appSocket = io("http://localhost:5000", {
  transports: ["websocket", "polling"], // use WebSocket first, if available
});

appSocket.on("connect_error", () => {
  // revert to classic upgrade
  appSocket.io.opts.transports = ["polling", "websocket"];
});
