import express from "express";
import { configDotenv } from "dotenv";
configDotenv();

import errorHandler from "./middlewares/errorHandler.js";
import { app, server } from "./socket/socket.js";
import connectToDatabase from "./utils/connectToDatabase.js";
import roomRouter from "./routes/room.route.js";

app.use(express.json());

app.use("/api", roomRouter);

app.use(errorHandler);

connectToDatabase()
	.then(() => {
		server.listen(process.env.PORT || 8000, () => {
			console.log("server running on port " + process.env.PORT || 8000);
		});
	})
	.catch((error) => {
		console.log(error);
		process.exit(1);
	});
