import cron from "node-cron";
import * as roomServices from "../services/room.services.js";
import throwError from "../utils/throwError.js";

const clearInactiveRooms = async () => {
	cron.schedule("0 0 6 * * *", async () => {
		try {
			const inactiveRooms = await roomServices.findInactiveRooms();
			for (const room of inactiveRooms) {
				await roomServices.removeByRoomCode(room.roomCode);
			}
		} catch (error) {
			throwError(error);
		}
	});
};

export default clearInactiveRooms;
