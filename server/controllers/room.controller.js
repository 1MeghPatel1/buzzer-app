import {
	createRoomDB,
	deletePlayerDB,
	deleteRoomDB,
	findRoomDBAndJoin,
} from "../services/room.services.js";
import AppError from "../utils/AppError.js";
import createResponse from "../utils/responseGenerator.js";

const createRoom = async (req, res, next) => {
	try {
		if (!req.body.roomName) {
			throw new AppError("Name is required", 400);
		}
		const newRoom = await createRoomDB(req.body.roomName);
		return createResponse(res, 201, "Room created successfully!", newRoom);
	} catch (error) {
		return next(error);
	}
};

const findRoomAndJoin = async (req, res, next) => {
	try {
		const roomCode = req.params.roomCode;
		const playerName = req.body.playerName;
		if (!roomCode || !playerName) {
			throw new AppError("Room code or Player name is not provided!", 400);
		}

		const room = await findRoomDBAndJoin(roomCode, playerName);
		if (!room) {
			throw new AppError("Room not found", 404);
		}

		return createResponse(
			res,
			200,
			"Room found and joined successfully!",
			room
		);
	} catch (error) {
		next(error);
	}
};

const deleteRoom = async (req, res, next) => {
	try {
		const roomCode = req.params.roomCode;
		if (!roomCode) {
			throw new AppError("Room code is required", 400);
		}

		const deletedRoom = await deleteRoomDB(roomCode);
		if (!deletedRoom) {
			throw new AppError("Room not Found!", 400);
		}

		return createResponse(res, 200, "Room deleted successfully!", deletedRoom);
	} catch (error) {
		next(error);
	}
};

const deletePlayer = async (req, res, next) => {
	try {
		const playerName = req.body.playerName;
		if (!playerName) {
			throw new AppError("Player name is required", 400);
		}

		const deletedPlayer = await deletePlayerDB(playerName);
		if (!deletedPlayer) {
			throw new AppError("Player not Found!", 400);
		}

		return createResponse(
			res,
			200,
			"Player deleted successfully!",
			deletedPlayer
		);
	} catch (error) {
		next(error);
	}
};

export { createRoom, deleteRoom, findRoomAndJoin, deletePlayer };
