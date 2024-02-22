import http from "http";
import { socketioConfig } from "./socketConfig.js";

const server = http.createServer();
const io = socketioConfig.getIo(server);

export { io, server };
