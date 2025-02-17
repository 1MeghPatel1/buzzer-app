import BuzzedPlayers from "./BuzzedPlayers";
import BuzzerBox from "./BuzzerBox";
import JoinedPlayers from "./JoinedPlayers";
import RoomDetails from "./RoomDetails";
import ScoreBoard from "./ScoreBoard";

const Player = () => {
  return (
    <div className="grid min-h-svh w-full grid-cols-1 items-start gap-4 px-2 py-14 font-body sm:grid-rows-5 md:grid-cols-2 xl:grid-cols-3">
      <RoomDetails />
      <BuzzerBox />
      <ScoreBoard />
      <JoinedPlayers />
      <BuzzedPlayers />
    </div>
  );
};

export default Player;
