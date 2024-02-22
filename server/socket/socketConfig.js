import { Server } from "socket.io";
import roomHandlers from "../handlers/roomHandler.js";
import playerHandlers from "../handlers/playerHandler.js";

export const socketioConfig = {
	getIo: (server) => {
		const io = new Server(server, {
			cors: {
				origin: ["http://localhost:3000"],
				methods: ["GET", "POST", "PUT"],
			},
		});

		const onConnection = (socket) => {
			roomHandlers(io, socket);
			playerHandlers(io, socket);
		};

		io.on("connection", onConnection);
		return io;
	},
};
