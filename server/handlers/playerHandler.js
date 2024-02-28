import * as playerServices from "../services/player.services.js";
import * as roomServices from "../services/room.services.js";
import { scoreSchema } from "../utils/schemas.js";
import throwError from "../utils/throwError.js";

const playerHandlers = (io, socket) => {
	const increaseScore = async (payload, callback) => {
		try {
			const { error, value: validatedPayload } = scoreSchema.validate(payload);
			if (error) {
				return throwError(error);
			}

			if (!socket.data.isPlayerHost) {
				return throwError(new Error("Player is not allowed"));
			}

			const updatedRoom = await playerServices.increaseScore(
				validatedPayload.socketId,
				validatedPayload.score
			);

			io.to(updatedRoom.roomCode).emit("room:updateRoomState", updatedRoom);
		} catch (error) {
			callback({ success: false, message: error.message, error: error }, null);
			return;
		}
	};

	const setScore = async (payload, callback) => {
		try {
			const { error, value: validatedPayload } = scoreSchema.validate(payload);
			if (error) {
				return throwError(error);
			}

			if (!socket.data.isPlayerHost) {
				return throwError(new Error("Player is not allowed"));
			}

			const updatedRoom = await playerServices.setScore(
				validatedPayload.socketId,
				validatedPayload.score
			);

			io.to(updatedRoom.roomCode).emit("room:updateRoomState", updatedRoom);
		} catch (error) {
			callback({ success: false, message: error.message, error }, null);
			return;
		}
	};

	socket.on("player:increaseScore", increaseScore);
	socket.on("player:setScore", setScore);
};

export default playerHandlers;
