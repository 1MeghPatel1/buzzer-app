import * as roomServices from "../services/room.services.js";
import * as playerServices from "../services/player.services.js";
import {
	createRoomSchema,
	getRoomSchema,
	roomEventSchema,
} from "../utils/schemas.js";

const roomHandlers = (io, socket) => {
	const createRoom = async (payload, callback) => {
		try {
			const { error, value: validatedPayload } =
				createRoomSchema.validate(payload);
			if (error) {
				throw new Error(error.message);
				return;
			}
			const updatedRoom = await roomServices.create(
				validatedPayload.roomName,
				socket.id
			);
			socket.join(updatedRoom.roomCode);
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
				throw new Error(error.message);
				return;
			}
			const updatedRoom = await roomServices.findAndJoin(
				validatedPayload.roomCode,
				validatedPayload.playerName,
				socket.id
			);
			socket.join(updatedRoom.roomCode);
			io.to(updatedRoom.roomCode).emit("room:updateRoomState", updatedRoom);
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
				throw new Error(error.message);
				return;
			}
			const room = await roomServices.find(validatedPayload.roomCode);
			io.to(socket.id).emit("room:receiveRoomDetails", room);
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
				throw new Error(error.message);
				return;
			}

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
				io.to(removedRoom.roomCode).emit("roomRemoved", {
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

	const resetBuzzers = async (payload, callback) => {
		try {
			const { error, value: validatedPayload } =
				getRoomSchema.validate(payload);
			if (error) {
				throw new Error(error.message);
				return;
			}

			const player = await playerServices.findBySocketId(socket.id);
			if (!player.isHost) {
				callback({ success: false, message: error.message, error }, null);
				return;
			}

			const updatedRoom = await roomServices.resetBuzzers(
				validatedPayload.roomCode
			);
			io.to(updatedRoom.roomCode).emit("room:updateRoomState", updatedRoom);
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
				throw new Error(error.message);
				return;
			}
			const player = await playerServices.findBySocketId(socket.id);
			if (!player.isHost) {
				callback(
					{ success: false, message: "Player is not allowed!", error: {} },
					null
				);
				return;
			}
			const updatedRoom = await roomServices.lockBuzzers(
				validatedPayload.roomCode
			);
			io.to(updatedRoom.roomCode).emit("room:updateRoomState", updatedRoom);
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
				throw new Error(error.message);
				return;
			}
			const player = await playerServices.findBySocketId(socket.id);
			if (!player.isHost) {
				callback(
					{ success: false, message: "Player is not allowed!", error: {} },
					null
				);
				return;
			}
			const updatedRoom = await roomServices.unlockBuzzers(
				validatedPayload.roomCode
			);
			io.to(updatedRoom.roomCode).emit("room:updateRoomState", updatedRoom);
		} catch (error) {
			callback({ success: false, message: error.message, error }, null);
			return;
		}
	};

	socket.on("disconnect", onDisconnect);
	socket.on("room:buzz", onBuzzRoom);
	socket.on("room:getDetails", getRoomDetails);
	socket.on("room:join", joinRoom);
	socket.on("room:create", createRoom);
	socket.on("room:resetBuzzers", resetBuzzers);
	socket.on("room:lockBuzzers", lockBuzzers);
	socket.on("room:unlockBuzzers", unlockBuzzers);
};

export default roomHandlers;
