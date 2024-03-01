import { io } from "socket.io-client";

//initializing socket.io
export const appSocket = io("http://localhost:5000");
