import Player from "../models/player.model.js";
import Room from "../models/room.model.js";
import crypto from "crypto";
import AppError from "./../utils/AppError.js";
import * as playerServices from "./player.services.js";
import throwError from "../utils/throwError.js";

const create = async (roomName, socketId) => {
	try {
		const isHost = true;
		const roomCode = crypto.randomBytes(8).toString("hex");
		const room = new Room({ roomName, roomCode, socketId });
		const player = await playerServices.create(
			roomName,
			room._id,
			roomCode,
			socketId,
			isHost
		);

		room.players.push(player._id);
		await room.save();

		const updatedRoom = await Room.findOne({ roomCode })
			.populate("players")
			.populate("buzzedPlayers");
		return updatedRoom;
	} catch (error) {
		throwError(error);
	}
};

const find = async (roomCode) => {
	try {
		const room = await Room.findOne({ roomCode })
			.populate("players")
			.populate("buzzedPlayers");
		if (!room) {
			throw new AppError("Room not found", 404);
		}
		return room;
	} catch (error) {
		throwError(error);
	}
};

const findAndJoin = async (roomCode, playerName, socketId) => {
	try {
		const room = await Room.findOne({ roomCode });
		if (!room) {
			throw new AppError("Room not found", 404);
		}
		const player = await playerServices.create(
			playerName,
			room._id,
			roomCode,
			socketId
		);

		if (!room.players.includes(player._id)) {
			room.players.push(player._id);
		}
		await room.save();

		const updatedRoom = await Room.findOne({ roomCode })
			.populate("players")
			.populate("buzzedPlayers");

		return updatedRoom;
	} catch (error) {
		throwError(error);
	}
};

const removeByRoomCode = async (roomCode) => {
	try {
		const room = await Room.findOneAndDelete({ roomCode });
		if (!room) {
			throw new AppError("Room not found", 404);
		}

		const deletedPlayers = await Player.deleteMany({ roomJoined: room._id });

		return { room, deletedPlayers };
	} catch (error) {
		throwError(error);
	}
};

const removeByPlayerName = async (playerName) => {
	try {
		const player = await playerServices.remove(playerName);

		await Room.updateOne(
			{ _id: player.roomJoined },
			{ $pull: { players: player._id } }
		);

		return player;
	} catch (error) {
		throwError(error);
	}
};

const removePlayerBySocketId = async (socketId) => {
	try {
		const player = await playerServices.removeBySocketId(socketId);

		const room = await Room.updateOne(
			{ _id: player.roomJoined },
			{ $pull: { players: player._id, buzzedPlayers: player._id } }
		);

		return Room.findById(player.roomJoined)
			.populate("players")
			.populate("buzzedPlayers");
	} catch (error) {
		throwError(error);
	}
};

const removeBuzzedPlayer = async (socketId) => {
	try {
		const player = await playerServices.findBySocketId(socketId);
		const room = await Room.updateOne(
			{ _id: player.roomJoined },
			{ $pull: { buzzedPlayers: player._id } }
		);
		return Room.findOne({ roomCode })
			.populate("players")
			.populate("buzzedPlayers");
	} catch (error) {
		throwError(error);
	}
};

const addBuzzedPlayer = async (roomCode, playerName) => {
	try {
		const room = await Room.findOne({ roomCode });
		if (!room) {
			throw new AppError("Room not found", 404);
		}
		const player = await playerServices.findOne(playerName);

		if (!room.buzzedPlayers.includes(player._id)) {
			room.buzzedPlayers.push(player._id);
		}
		await room.save();

		return Room.findOne({ roomCode })
			.populate("buzzedPlayers")
			.populate("players");
	} catch (error) {
		throwError(error);
	}
};

const resetBuzzers = async (roomCode) => {
	try {
		const room = await Room.findOne({ roomCode });
		if (!room) {
			throw new AppError("Room not found", 404);
		}
		room.buzzedPlayers = [];
		await room.save();

		return Room.findOne({ roomCode })
			.populate("buzzedPlayers")
			.populate("players");
	} catch (error) {
		throwError(error);
	}
};

const lockBuzzers = async (roomCode) => {
	try {
		const room = await Room.findOne({ roomCode });
		if (!room) {
			throw new AppError("Room not found", 404);
		}
		room.isBuzzersLocked = true;
		await room.save();

		return Room.findOne({ roomCode })
			.populate("buzzedPlayers")
			.populate("players");
	} catch (error) {
		throwError(error);
	}
};

const unlockBuzzers = async (roomCode) => {
	try {
		const room = await Room.findOne({ roomCode });
		if (!room) {
			throw new AppError("Room not found", 404);
		}
		room.isBuzzersLocked = false;
		await room.save();

		return Room.findOne({ roomCode })
			.populate("buzzedPlayers")
			.populate("players");
	} catch (error) {
		throwError(error);
	}
};

export {
	create,
	findAndJoin,
	removeByRoomCode,
	removeByPlayerName,
	find,
	addBuzzedPlayer,
	removePlayerBySocketId,
	resetBuzzers,
	lockBuzzers,
	unlockBuzzers,
	removeBuzzedPlayer,
};
