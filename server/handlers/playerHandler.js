import * as playerServices from "../services/player.services.js";
import * as roomServices from "../services/room.services.js";
import { scoreSchema } from "../utils/schemas.js";

const playerHandlers = (io, socket) => {
	const increaseScore = async (payload, callback) => {
		try {
			const { error, value: validatedPayload } = scoreSchema.validate(payload);
			if (error) {
				throw new Error(error.message);
				return;
			}

			const player = await playerServices.increaseScore(
				socket.id,
				validatedPayload.score
			);

			const updatedRoom = await roomServices.find(player.roomCode);
			io.to(updatedRoom.roomCode).emit("room:updateRoomState", updatedRoom);
		} catch (err) {
			callback({ success: false, message: err.message, error: err }, null);
			return;
		}
	};

	const setScore = async (payload, callback) => {
		try {
			const { error, value: validatedPayload } = scoreSchema.validate(payload);
			if (error) {
				throw new Error(error.message);
				return;
			}

			const player = await playerServices.setScore(
				socket.id,
				validatedPayload.score
			);

			const updatedRoom = await roomServices.find(player.roomCode);
			io.to(updatedRoom.roomCode).emit("room:updateRoomState", updatedRoom);
		} catch (error) {
			callback({ success: false, message: err.message, error: err }, null);
			return;
		}
	};

	socket.on("player:increaseScore", increaseScore);
	socket.on("player:setScore", setScore);
};

export default playerHandlers;
