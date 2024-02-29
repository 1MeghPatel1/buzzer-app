import { ScrollArea } from "@/components/ui/scroll-area";
import PlayerScoreCard from "./PlayerScoreCard";

const ScoreBoard = () => {
  return (
    <div className="col-start-1 row-span-5  h-[50.55rem] rounded-md border border-gray-100  bg-violet-300 bg-opacity-30 bg-clip-padding px-10 py-6 shadow-2xl backdrop-blur-sm backdrop-filter sm:col-start-3">
      <h1 className="text-xl font-semibold">Score Board</h1>
      <ScrollArea className="mt-6 h-[42rem]">
        <div className="flex flex-col gap-4 px-4">
          <PlayerScoreCard />
          <PlayerScoreCard />
          <PlayerScoreCard />
          <PlayerScoreCard />
          <PlayerScoreCard />
          <PlayerScoreCard />
          <PlayerScoreCard />
          <PlayerScoreCard />
          <PlayerScoreCard />
        </div>
      </ScrollArea>
    </div>
  );
};

export default ScoreBoard;
