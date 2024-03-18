import * as roomServices from "../services/room.services.js";
import * as playerServices from "../services/player.services.js";
import {
	createRoomSchema,
	getRoomSchema,
	removePlayerSchema,
	roomEventSchema,
} from "../utils/schemas.js";
import throwError from "../utils/throwError.js";

const roomHandlers = (io, socket) => {
	const createRoom = async (payload, callback) => {
		try {
			const { error, value: validatedPayload } =
				createRoomSchema.validate(payload);
			if (error) {
				return throwError(new Error(error.message));
			}
			const player = await playerServices.findOne(validatedPayload.roomName);
			if (player) {
				throwError(new Error("Room name already exists"));
			}
			const updatedRoom = await roomServices.create(
				validatedPayload.roomName,
				socket.id
			);
			socket.join(updatedRoom.roomCode);
			socket.data.isPlayerHost = true;
			io.to(updatedRoom.roomCode).emit("room:updateRoomState", updatedRoom);
			callback(null, {
				success: true,
				message: "Created new room successfully!",
				room: updatedRoom,
			});
		} catch (error) {
			callback({ success: false, message: error.message, error }, null);
			return;
		}
	};

	const joinRoom = async (payload, callback) => {
		try {
			const { error, value: validatedPayload } =
				roomEventSchema.validate(payload);
			if (error) {
				return throwError(new Error(error.message));
			}
			const player = await playerServices.findOne(validatedPayload.playerName);
			if (player) {
				throwError(new Error("Player name already exists"));
			}
			const updatedRoom = await roomServices.findAndJoin(
				validatedPayload.roomCode,
				validatedPayload.playerName,
				socket.id
			);
			socket.join(updatedRoom.roomCode);
			socket.data.isPlayerHost = false;
			io.to(updatedRoom.roomCode).emit("room:updateRoomState", updatedRoom);
			callback(null, {
				success: true,
				message: "Joined room successfully!",
				room: updatedRoom,
			});
		} catch (error) {
			callback({ success: false, message: error.message, error }, null);
			return;
		}
	};

	const getRoomDetails = async (payload, callback) => {
		try {
			const { error, value: validatedPayload } =
				getRoomSchema.validate(payload);
			if (error) {
				return throwError(new Error(error.message));
			}
			const room = await roomServices.find(validatedPayload.roomCode);
			io.to(socket.id).emit("room:receiveRoomDetails", room);
			callback(null, {
				success: true,
				message: "Get room successfully!",
				room: updatedRoom,
			});
		} catch (error) {
			callback({ success: false, message: error.message, error }, null);
			return;
		}
	};

	const onBuzzRoom = async (payload, callback) => {
		try {
			const { error, value: validatedPayload } =
				roomEventSchema.validate(payload);
			if (error) {
				return throwError(new Error(error.message));
			}

			io.to(validatedPayload.roomCode).emit("room:playerBuzzed");

			const room = await roomServices.find(validatedPayload.roomCode);
			if (room.isBuzzersLocked) {
				throw new Error("Host has locked all the buzzers");
				return;
			}

			const updatedRoom = await roomServices.addBuzzedPlayer(
				validatedPayload.roomCode,
				validatedPayload.playerName
			);
			io.to(validatedPayload.roomCode).emit(
				"room:updateRoomState",
				updatedRoom
			);
			callback(null, {
				success: true,
				message: "Buzzed successfully!",
				room: updatedRoom,
			});
		} catch (error) {
			callback({ success: false, message: error.message, error }, null);
			return;
		}
	};

	const onDisconnect = async () => {
		try {
			const player = await playerServices.findBySocketId(socket.id);
			if (player.isHost) {
				const removedRoom = await roomServices.removeByRoomCode(
					player.roomJoined.roomCode
				);
				io.to(player.roomCode).emit("roomRemoved", {
					success: true,
					message: "Room removed successfully!",
					room: removedRoom,
				});
			} else {
				const updatedRoom = await roomServices.removePlayerBySocketId(
					socket.id
				);
				io.to(player.roomJoined.roomCode).emit(
					"room:updateRoomState",
					updatedRoom
				);
				socket.leave(updatedRoom.roomCode);
			}
		} catch (error) {
			return;
		}
	};

	const removePlayer = async (payload, callback) => {
		try {
			const { error, value: validatedPayload } =
				removePlayerSchema.validate(payload);
			if (error) {
				return throwError(new Error(error.message));
			}
			const updatedRoom = await roomServices.removePlayerBySocketId(
				validatedPayload.socketId
			);
			io.to(updatedRoom.roomCode).emit("room:updateRoomState", updatedRoom);
			callback(null, {
				success: true,
				message: "Removed player successfully!",
				room: updatedRoom,
			});
		} catch (error) {
			callback({ success: false, message: error.message, error }, null);
			return;
		}
	};

	const removeBuzzedPlayer = async (payload, callback) => {
		try {
			const { error, value: validatedPayload } =
				removePlayerSchema.validate(payload);
			if (error) {
				return throwError(new Error(error.message));
			}
			const updatedRoom = await roomServices.removeBuzzedPlayer(
				validatedPayload.socketId
			);
			io.to(updatedRoom.roomCode).emit("room:updateRoomState", updatedRoom);
			callback(null, {
				success: true,
				message: "Removed buzzed player successfully!",
				room: updatedRoom,
			});
		} catch (error) {
			callback({ success: false, message: error.message, error }, null);
			return;
		}
	};

	const resetBuzzers = async (payload, callback) => {
		try {
			const { error, value: validatedPayload } =
				getRoomSchema.validate(payload);
			if (error) {
				return throwError(new Error(error.message));
			}
			if (!socket.data.isPlayerHost) {
				return throwError(new Error("Player is not allowed!"));
			}

			const updatedRoom = await roomServices.resetBuzzers(
				validatedPayload.roomCode
			);
			io.to(updatedRoom.roomCode).emit("room:updateRoomState", updatedRoom);
			callback(null, {
				success: true,
				message: "Reset buzzers successfully!",
				room: updatedRoom,
			});
		} catch (error) {
			callback({ success: false, message: error.message, error }, null);
			return;
		}
	};

	const lockBuzzers = async (payload, callback) => {
		try {
			const { error, value: validatedPayload } =
				getRoomSchema.validate(payload);
			if (error) {
				return throwError(new Error(error.message));
			}

			if (!socket.data.isPlayerHost) {
				return throwError(new Error("Player is not allowed!"));
			}

			const updatedRoom = await roomServices.lockBuzzers(
				validatedPayload.roomCode
			);
			io.to(updatedRoom.roomCode).emit("room:updateRoomState", updatedRoom);
			callback(null, {
				success: true,
				message: "Locked buzzers successfully!",
				room: updatedRoom,
			});
		} catch (error) {
			callback({ success: false, message: error.message, error }, null);
			return;
		}
	};

	const unlockBuzzers = async (payload, callback) => {
		try {
			const { error, value: validatedPayload } =
				getRoomSchema.validate(payload);
			if (error) {
				return throwError(new Error(error.message));
			}

			if (!socket.data.isPlayerHost) {
				return throwError(new Error("Player is not allowed!"));
			}

			const updatedRoom = await roomServices.unlockBuzzers(
				validatedPayload.roomCode
			);
			io.to(updatedRoom.roomCode).emit("room:updateRoomState", updatedRoom);
			callback(null, {
				success: true,
				message: "Unlocked buzzers successfully!",
				room: updatedRoom,
			});
		} catch (error) {
			callback({ success: false, message: error.message, error }, null);
			return;
		}
	};

	socket.on("room:disconnect", onDisconnect);
	socket.on("room:buzz", onBuzzRoom);
	socket.on("room:getDetails", getRoomDetails);
	socket.on("room:join", joinRoom);
	socket.on("room:create", createRoom);
	socket.on("room:resetBuzzers", resetBuzzers);
	socket.on("room:lockBuzzers", lockBuzzers);
	socket.on("room:unlockBuzzers", unlockBuzzers);
	socket.on("room:removePlayer", removePlayer);
	socket.on("room:removeBuzzedPlayer", removeBuzzedPlayer);
};

export default roomHandlers;
