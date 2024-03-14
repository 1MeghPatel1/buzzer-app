import { ScrollArea } from "@/components/ui/scroll-area";
import PlayerScoreCard from "./PlayerScoreCard";
import useStore, { Player } from "@/store/store";
import { useEffect, useState } from "react";
import { sortPlayers } from "@/utils/helper";

const ScoreBoard = () => {
  const roomState = useStore((state) => state.roomState);
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>(() =>
    sortPlayers(roomState.players.slice()),
  );

  useEffect(() => {
    setSortedPlayers(sortPlayers(roomState.players.slice()));
    return () => {
      setSortedPlayers([]);
    };
  }, [roomState.players]);

  return (
    <div className="col-start-1 row-span-5  h-[46.55rem] rounded-md border border-gray-100  bg-violet-300 bg-opacity-30 bg-clip-padding px-10 py-6 shadow-2xl backdrop-blur-sm backdrop-filter lg:col-start-3">
      <h1 className="text-xl font-semibold">Score Board</h1>
      <ScrollArea className="mt-6 h-[42rem]">
        <div className="flex flex-col gap-4 sm:px-4">
          {sortedPlayers.map(
            (player) =>
              player.socketId !== roomState.socketId && (
                <PlayerScoreCard key={player.socketId} player={player} />
              ),
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ScoreBoard;
