import { ReactNode, useCallback, useEffect } from "react";
import useStore, { Player, RoomState } from "@/store/store";
import { appSocket } from "./socket";

const Events = ({ children }: { children: ReactNode }) => {
  const updateRoomState = useStore((state) => state.updateRoomState);
  const updatePlayerInfo = useStore((state) => state.updatePlayerInfo);

  //Event Functions
  const updateState = useCallback(
    (state: RoomState) => {
      const updatedRoomState = {
        roomName: state.roomName,
        roomCode: state.roomCode,
        socketId: state.socketId,
        players: state.players,
        buzzedPlayers: state.buzzedPlayers,
        isBuzzersLocked: state.isBuzzersLocked,
      };

      const playerInfoDB = state.players.find(
        (player) => player.socketId === appSocket.id,
      ) as Player;

      const playerInfo = {
        name: playerInfoDB.name,
        isHost: playerInfoDB.isHost,
        avatar: playerInfoDB.avatar,
        score: playerInfoDB.score,
        socketId: playerInfoDB.socketId,
        roomJoined: playerInfoDB.roomJoined,
        roomCode: playerInfoDB.roomCode,
      };

      updatePlayerInfo(playerInfo);
      updateRoomState(updatedRoomState);
    },
    [updateRoomState, updatePlayerInfo],
  );

  const onConnect = () => {
    console.log("connected");
  };

  const onDisconnect = () => {
    console.log("disconnected");
  };

  useEffect(() => {
    appSocket.on("room:updateRoomState", updateState);

    appSocket.on("connect", onConnect);

    appSocket.on("disconnect", onDisconnect);

    return () => {
      appSocket.off("room:updateRoomState", updateState);
      appSocket.off("connect", onConnect);
      appSocket.off("disconnect", onDisconnect);
    };
  }, [updateState]);

  return children;
};

export default Events;
