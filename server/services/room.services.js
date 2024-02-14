import Player from "../models/player.model.js";
import Room from "../models/room.model.js";
import crypto from "crypto";
import AppError from "./../utils/AppError.js";

const createRoomDB = async (roomName) => {
	try {
		const roomCode = crypto.randomBytes(8).toString("hex");
		const room = new Room({ roomName, roomCode });
		await room.save();
		return room;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const findRoomDBAndJoin = async (roomCode, playerName) => {
	try {
		const room = await Room.findOne({ roomCode });
		if (!room) {
			throw new AppError("Room not found", 404);
		}
		const player = await Player.create({
			name: playerName,
			roomJoined: room._id,
		});
		room.players.push(player._id);
		await room.save();

		const updatedRoom = await Room.findOne({ roomCode }).populate("players");

		return updatedRoom;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const deleteRoomDB = async (roomCode) => {
	try {
		const room = await Room.findOneAndDelete({ roomCode });
		if (!room) {
			throw new AppError("Room not found", 404);
		}

		const deletedPlayers = await Player.deleteMany({ roomJoined: room._id });

		return { room, deletedPlayers };
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const deletePlayerDB = async (playerName) => {
	try {
		const player = await Player.findOneAndDelete({ name: playerName });
		if (!player) {
			throw new AppError("Player not found", 404);
		}
		await Room.updateOne(
			{ _id: player.roomJoined },
			{ $pull: { players: player._id } }
		);
		return player;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export { createRoomDB, findRoomDBAndJoin, deleteRoomDB, deletePlayerDB };
