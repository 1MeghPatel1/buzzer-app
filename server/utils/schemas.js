import Joi from "joi";

const roomEventSchema = Joi.object({
	playerName: Joi.string().min(3).max(50).required(),
	roomCode: Joi.string().min(3).max(50).required(),
});

const createRoomSchema = Joi.object({
	roomName: Joi.string().min(3).max(50).required(),
});

const getRoomSchema = Joi.object({
	roomCode: Joi.string().min(3).max(50).required(),
});

const scoreSchema = Joi.object({
	score: Joi.number().required(),
	socketId: Joi.string().required(),
});

export { roomEventSchema, createRoomSchema, getRoomSchema, scoreSchema };
