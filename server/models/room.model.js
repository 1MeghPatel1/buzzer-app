import mongoose, { Schema } from "mongoose";
const roomSchema = mongoose.Schema(
	{
		roomName: {
			type: String,
			required: true,
		},
		roomCode: {
			type: String,
			unique: true,
			required: true,
		},
		socketId: {
			type: String,
			required: true,
			unique: true,
		},
		players: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: "Player",
				},
			],
			default: [],
		},
		buzzedPlayers: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: "Player",
				},
			],
			default: [],
		},
		isBuzzersLocked: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
