import { z } from "zod";

const joinRoomSchema = z.object({
	roomCode: z
		.string({
			required_error: "Room Code is required",
			invalid_type_error: "First name must be a string",
		})
		.min(2, {
			message: "Room Code must be at least 2 characters",
		})
		.max(50),
	playerName: z
		.string({
			required_error: "Player Name is required",
			invalid_type_error: "First name must be a string",
		})
		.min(2, {
			message: "Player Name must be at least 2 characters",
		})
		.max(50),
});

export default joinRoomSchema;
