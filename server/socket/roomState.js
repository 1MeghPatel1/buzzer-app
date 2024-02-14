class roomState {
	static rooms = [];
	constructor(roomCode, players = [], playersBuzzed = []) {
		this.roomCode = roomCode;
		this.players = players;
		this.playersBuzzed = playersBuzzed;
		roomState.rooms.push(this);
	}

	static getRoomState(roomCode) {
		return roomState.rooms.find((room) => room.roomCode === roomCode);
	}

	static getRoomStateByPlayer(playerName) {
		return roomState.rooms.find((room) =>
			room.players.find((player) => player.name === playerName)
		);
	}

	static getRoomStateBySocketId(socketId) {
		return roomState.rooms.find((room) =>
			room.players.find((player) => player.socketId === socketId)
		);
	}

	static deleteRoom(roomCode) {
		roomState.rooms = roomState.rooms.filter(
			(room) => room.roomCode !== roomCode
		);
	}
}

export default roomState;
