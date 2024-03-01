import { create } from "zustand";

export interface Player {
  name: string;
  isHost: boolean;
  socketId: string;
  avatar: string;
  score: number;
  roomCode: string;
  roomJoined: string;
}

export interface RoomState {
  roomName: string;
  roomCode: string;
  socketId: string;
  players: Player[];
  buzzedPlayers: Player[];
  isBuzzersLocked: boolean;
}

export interface StoreState {
  roomState: RoomState;
  playerInfo: Player;
  updatePlayerInfo: (updatedPlayerInfo: Player) => void;
  updateRoomState: (updatedRoomState: RoomState) => void;
}

const useStore = create<StoreState>((set) => ({
  roomState: {
    roomName: "",
    roomCode: "",
    socketId: "",
    players: [],
    buzzedPlayers: [],
    isBuzzersLocked: false,
  },
  playerInfo: {
    name: "",
    isHost: false,
    socketId: "",
    roomCode: "",
    avatar: "",
    score: 0,
    roomJoined: "",
  },
  updatePlayerInfo: (updatedPlayerInfo: Player) =>
    set({ playerInfo: updatedPlayerInfo }),

  updateRoomState: (updatedRoomState: RoomState) =>
    set({ roomState: updatedRoomState }),
}));

export default useStore;
