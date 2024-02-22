import mongoose, { Schema } from "mongoose";
const playerSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		roomJoined: {
			type: Schema.Types.ObjectId,
			ref: "Room",
		},
		roomCode: { type: String, required: true },
		socketId: {
			type: String,
			unique: true,
			required: true,
		},
		isHost: { type: Boolean, default: false },
		score: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

const Player = mongoose.model("Player", playerSchema);

export default Player;
