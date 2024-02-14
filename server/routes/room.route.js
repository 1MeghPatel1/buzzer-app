import express from "express";
import {
	createRoom,
	deletePlayer,
	deleteRoom,
	findRoomAndJoin,
} from "../controllers/room.controller.js";

const roomRouter = express.Router();

roomRouter.post("/create-room", createRoom);

roomRouter.get("/find-room/:roomCode", findRoomAndJoin);

roomRouter.delete("/delete-room/:roomCode", deleteRoom);

roomRouter.delete("/delete-player/", deletePlayer);

export default roomRouter;
