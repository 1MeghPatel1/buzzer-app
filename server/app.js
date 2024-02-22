import { configDotenv } from "dotenv";
configDotenv();

import { server } from "./socket/socket.js";
import connectToDatabase from "./utils/connectToDatabase.js";
import logger from "./logger/logger.js";

connectToDatabase()
	.then(() => {
		server.listen(process.env.PORT || 8000, () => {
			console.log("server running on port " + process.env.PORT || 8000);
			logger.info("server running on port " + process.env.PORT || 8000);
		});
	})
	.catch((error) => {
		console.log(error);
		process.exit(1);
	});
