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
		players: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: "Player",
				},
			],
			default: [],
		},
	},
	{ timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
