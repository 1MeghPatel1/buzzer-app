import { ScrollArea } from "@/components/ui/scroll-area";
import BuzzedPlayer from "./BuzzedPlayer";
import useStore from "@/store/store";

const BuzzedPlayers = () => {
  const roomState = useStore((state) => state.roomState);
  return (
    <div className="flex min-h-[30rem] flex-col gap-4 rounded-md border border-gray-100  bg-rose-300 bg-opacity-30 bg-clip-padding px-10 py-6 shadow-2xl backdrop-blur-sm backdrop-filter sm:row-span-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Buzzed Players</h1>
        <h3 className="text-lg font-semibold">
          Buzzed Players -{" "}
          <span className="text-lg font-semibold">
            {roomState.buzzedPlayers.length}
          </span>
        </h3>
      </div>
      <ScrollArea className="mt-2 h-[21rem]">
        <div className="mt-2 flex flex-col gap-4 sm:px-4">
          {roomState.buzzedPlayers.map((player) => (
            <BuzzedPlayer key={player.socketId} player={player} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default BuzzedPlayers;
