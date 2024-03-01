import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { appSocket } from "@/socket/socket";
import { Player } from "@/store/store";
import { socketResponse } from "@/utils/types";
import { CheckCircle, Pencil } from "lucide-react";
import { useState } from "react";

const PlayerScoreCard = ({ player }: { player: Player }) => {
  const [changeScoreBy, setChangeScoreBy] = useState(10);
  const [changeScoreByInput, setChangeScoreByInput] = useState("");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setChangeScoreBy(Number(changeScoreByInput));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeScoreByInput(e.target.value);
  };

  const handleIncreaseScore = () => {
    try {
      appSocket.timeout(5000).emit(
        "player:increaseScore",
        {
          socketId: player.socketId,
          score: changeScoreBy,
        },
        (error: socketResponse, res: socketResponse) => {
          if (error) {
            console.log(error);
          }
          return res;
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleDecreaseScore = () => {
    try {
      appSocket.timeout(5000).emit(
        "player:decreaseScore",
        {
          socketId: player.socketId,
          score: changeScoreBy,
        },
        (error: socketResponse, res: socketResponse) => {
          if (error) {
            console.log(error);
          }
          return res;
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HoverCard>
      <div className="flex items-center justify-between rounded-3xl bg-brand-primary-foreground p-3 dark:bg-indigo-950">
        <div className="flex items-center justify-start gap-4">
          <Avatar>
            <AvatarImage src={player.avatar} alt="Avatar" />
            <AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-semibold">{player.name}</h3>
        </div>
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-lg font-bold">{player.score}</h3>
          <HoverCardTrigger>
            <Button className="rounded-full" variant="secondary" size="sm">
              <Pencil />
            </Button>
          </HoverCardTrigger>
        </div>
        <HoverCardContent className="w-30 flex flex-col gap-3">
          <div className="flex w-full items-center space-x-4">
            <Input
              type="text"
              placeholder="Increase Score By"
              onChange={handleChange}
              value={changeScoreByInput}
            />
            <Button
              className="w-14 rounded-full"
              variant="outline"
              size="icon"
              onClick={handleClick}
            >
              <CheckCircle />
            </Button>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              className="rounded-full"
              variant="outline"
              size="icon"
              onClick={handleIncreaseScore}
            >
              {changeScoreBy}
            </Button>
            <Button
              className="rounded-full"
              variant="outline"
              size="icon"
              onClick={handleDecreaseScore}
            >
              -{changeScoreBy}
            </Button>
          </div>
        </HoverCardContent>
      </div>
    </HoverCard>
  );
};

export default PlayerScoreCard;
