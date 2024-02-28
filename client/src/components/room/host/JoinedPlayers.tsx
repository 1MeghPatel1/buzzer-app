import { ScrollArea } from "@/components/ui/scroll-area";
import JoinedPlayer from "./JoinedPlayer";

const JoinedPlayers = () => {
  return (
    <div className="flex min-h-full flex-col gap-4 rounded-md border border-gray-100  bg-cyan-300 bg-opacity-30 bg-clip-padding px-10 py-6 shadow-2xl backdrop-blur-sm backdrop-filter sm:row-span-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Joined Players</h1>
        <h3 className="text-lg font-semibold">
          Total Players - <span className="text-lg font-semibold">3</span>
        </h3>
      </div>
      <ScrollArea className="mt-2 h-[21rem]">
        <div className="flex flex-col gap-4 px-4">
          <JoinedPlayer />
          <JoinedPlayer />
          <JoinedPlayer />
          <JoinedPlayer />
          <JoinedPlayer />
          <JoinedPlayer />
        </div>
      </ScrollArea>
    </div>
  );
};

export default JoinedPlayers;
