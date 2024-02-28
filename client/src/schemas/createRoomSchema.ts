import { z } from "zod";

const createRoomSchema = z.object({
	roomName: z
		.string({
			required_error: "Room Name is required",
			invalid_type_error: "First name must be a string",
		})
		.min(2, {
			message: "Room Name must be at least 2 characters",
		})
		.max(50),
});

export default createRoomSchema;
