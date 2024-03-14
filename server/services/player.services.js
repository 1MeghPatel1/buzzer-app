import e from "express";
import Player from "../models/player.model.js";
import AppError from "../utils/AppError.js";
import throwError from "../utils/throwError.js";
import * as roomServices from "./room.services.js";
import { generateAvatar } from "../utils/helper.js";

const create = async (
	playerName,
	roomId,
	roomCode,
	socketId,
	isHost = false
) => {
	try {
		const avatar = generateAvatar();
		const player = await Player.findOneAndUpdate(
			{ socketId: socketId },
			{
				name: playerName,
				roomJoined: roomId,
				roomCode,
				socketId,
				isHost,
				avatar,
			},
			{
				upsert: true,
				new: true,
				runValidators: true,
			}
		);
		return player;
	} catch (error) {
		throwError(error);
	}
};

const findOne = async (playerName) => {
	try {
		const player = await Player.findOne({ name: playerName });
		return player;
	} catch (error) {
		throwError(error);
	}
};

const findBySocketId = async (socketId) => {
	try {
		const player = await Player.findOne({ socketId }).populate("roomJoined");
		if (!player) {
			throw new AppError("Player not found", 404);
		}

		return player;
	} catch (error) {
		throwError(error);
	}
};

const increaseScore = async (socketId, score) => {
	try {
		const player = await Player.findOneAndUpdate(
			{ socketId: socketId },
			{ $inc: { score } }
		);
		if (!player) {
			throw new AppError("Player not found", 404);
		}

		const updatedRoom = await roomServices.find(player.roomCode);

		return updatedRoom;
	} catch (error) {
		throwError(error);
	}
};

const decreaseScore = async (socketId, score) => {
	try {
		score = score * -1;
		const player = await Player.findOneAndUpdate(
			{ socketId: socketId },
			{ $inc: { score } }
		);
		if (!player) {
			throw new AppError("Player not found", 404);
		}

		const updatedRoom = await roomServices.find(player.roomCode);

		return updatedRoom;
	} catch (error) {
		throwError(error);
	}
};

const setScore = async (socketId, score) => {
	try {
		const player = await Player.findOneAndUpdate(
			{ socketId },
			{ $set: { score } }
		);
		if (!player) {
			throw new AppError("Player not found", 404);
		}

		const updatedRoom = await roomServices.find(player.roomCode);

		return updatedRoom;
	} catch (error) {
		throwError(error);
	}
};

const remove = async (playerName) => {
	try {
		const player = await Player.findOneAndDelete({ name: playerName });
		if (!player) {
			throw new AppError("Player not found", 404);
		}

		return player;
	} catch (error) {
		throwError(error);
	}
};

const removeBySocketId = async (socketId) => {
	try {
		const player = await Player.findOneAndDelete({ socketId });
		if (!player) {
			throw new AppError("Player not found", 404);
		}
		return player;
	} catch (error) {
		throwError(error);
	}
};

const removeAll = async (roomId) => {
	try {
		const players = await Player.deleteMany({ roomId });
		if (!players) {
			throw new AppError("Players not found", 404);
		}

		return players;
	} catch (error) {
		throwError(error);
	}
};

export {
	create,
	findOne,
	remove,
	removeAll,
	increaseScore,
	setScore,
	removeBySocketId,
	findBySocketId,
	decreaseScore,
};
