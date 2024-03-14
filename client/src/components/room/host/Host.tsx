import BuzzedPlayers from "./BuzzedPlayers";
import JoinedPlayers from "./JoinedPlayers";
import RoomDetails from "./RoomDetails";
import ScoreBoard from "./ScoreBoard";

const Host = () => {
  return (
    <div className="grid min-h-svh w-full grid-cols-1 items-start gap-4 px-2 py-14 font-body md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-4">
      <RoomDetails />
      <ScoreBoard />
      <JoinedPlayers />
      <BuzzedPlayers />
    </div>
  );
};

export default Host;
