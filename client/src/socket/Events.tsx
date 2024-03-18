import { ReactNode, useCallback, useEffect } from "react";
import useStore, { Player, RoomState } from "@/store/store";
import { appSocket } from "./socket";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import buzzerSound from "/sounds/Buzz.mp3";
import { removeItem, setItem } from "@/services/localStorageServices";

const Events = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const updateRoomState = useStore((state) => state.updateRoomState);
  const updatePlayerInfo = useStore((state) => state.updatePlayerInfo);
  const roomState = useStore((state) => state.roomState);
  const soundOn = useStore((state) => state.soundOn);

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

      if (!playerInfoDB) {
        navigate("/");
        toast({
          title: "Sorry",
          description:
            "You were removed from the game or something went wrong!",
          variant: "destructive",
        });
        removeItem("playerInfo");
        return;
      } else {
        setItem("playerInfo", playerInfoDB);
      }

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
    [updateRoomState, updatePlayerInfo, toast, navigate],
  );

  const refreshRoomState = useCallback(
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

      setItem("playerInfo", playerInfoDB);

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
      navigate("/room");
    },
    [updateRoomState, updatePlayerInfo, navigate],
  );

  const playSound = useCallback(() => {
    const audio = new Audio(buzzerSound);
    const currentPlayerBuzzed = roomState.buzzedPlayers.find(
      (player) => player.socketId === appSocket.id,
    );
    if (soundOn && !currentPlayerBuzzed) {
      audio.play();
    }
  }, [soundOn, roomState]);

  const onNotFound = useCallback(() => {
    navigate("/");
    removeItem("playerInfo");
    toast({
      title: "Sorry",
      description: "Player not found!",
      variant: "destructive",
    });
    return;
  }, [toast, navigate]);

  const onRoomRemoved = useCallback(() => {
    console.log("run");
    navigate("/");
    toast({
      title: "Sorry",
      description: "Room was removed by host!",
      variant: "destructive",
    });
    removeItem("playerInfo");
  }, [toast, navigate]);

  const onConnect = () => {
    console.log("connected");
  };

  const onDisconnect = () => {
    console.log("disconnected");
  };

  useEffect(() => {
    appSocket.on("room:updateRoomState", updateState);

    appSocket.on("room:playerBuzzed", playSound);

    appSocket.on("roomRemoved", onRoomRemoved);

    appSocket.on("player:notFound", onNotFound);

    appSocket.on("room:refreshRoomState", refreshRoomState);

    appSocket.on("connect", onConnect);

    appSocket.on("disconnect", onDisconnect);

    return () => {
      appSocket.off("room:updateRoomState", updateState);
      appSocket.off("room:playerBuzzed", playSound);
      appSocket.off("connect", onConnect);
      appSocket.off("disconnect", onDisconnect);
      appSocket.off("player:notFound", onNotFound);
      appSocket.off("room:refreshRoomState", refreshRoomState);
    };
  }, [updateState, onRoomRemoved, playSound, onNotFound, refreshRoomState]);

  return children;
};

export default Events;
