import mongoose, { Schema } from "mongoose";
const playerSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		roomJoined: {
			type: Schema.Types.ObjectId,
			ref: "Room",
		},
	},
	{ timestamps: true }
);

const Player = mongoose.model("Player", playerSchema);

export default Player;
