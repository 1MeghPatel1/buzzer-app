import { Server } from "socket.io";
import http from "http";
import express from "express";

import roomState from "./roomState.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST", "PUT"],
	},
});

io.on("connection", (socket) => {
	socket.on("joinRoom", ({ roomCode, playerName }) => {
		roomState.roomCode = roomCode;

		const roomAlreadyCreated = roomState.getRoomState(roomCode);

		let currentRoom;

		if (roomAlreadyCreated) {
			currentRoom = roomAlreadyCreated;
		} else {
			currentRoom = new roomState(roomCode);
		}

		currentRoom.players.push({ name: playerName, socketId: socket.id });
		socket.join(roomCode);
		io.to(currentRoom.roomCode).emit("getUpdatedRoomState", currentRoom);
	});

	socket.on("buzz", ({ playerName }) => {
		const currentRoom = roomState.getRoomStateByPlayer(playerName);
		if (!currentRoom) {
			return;
		}

		const alreadyBuzzed = currentRoom.playersBuzzed.find(
			(player) => player.name === playerName
		);
		if (alreadyBuzzed) {
			return;
		}

		currentRoom.playersBuzzed.push({ name: playerName, socketId: socket.id });
		io.to(currentRoom.roomCode).emit("getUpdatedRoomState", currentRoom);
	});

	socket.on("disconnect", () => {
		const currentRoom = roomState.getRoomStateBySocketId(socket.id);
		currentRoom.players = currentRoom.players.filter(
			(player) => player.socketId !== socket.id
		);
		currentRoom.playersBuzzed = currentRoom.playersBuzzed.filter(
			(player) => player.socketId !== socket.id
		);

		if (currentRoom.players.length === 0) {
			roomState.deleteRoom(currentRoom.roomCode);
		} else {
			io.to(currentRoom.roomCode).emit("getUpdatedRoomState", currentRoom);
		}
	});
});

export { app, io, server };
