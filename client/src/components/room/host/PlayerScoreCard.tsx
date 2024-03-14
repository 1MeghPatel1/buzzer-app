import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { appSocket } from "@/socket/socket";
import { Player } from "@/store/store";
import { socketResponse } from "@/utils/types";
import { CheckCircle, Pencil } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PlayerScoreCard = ({ player }: { player: Player }) => {
  const [changeScoreBy, setChangeScoreBy] = useState(10);
  const [changeScoreByInput, setChangeScoreByInput] = useState("");
  const [transitioning, setTransitioning] = useState(false);
  const { toast } = useToast();

  const changeTransitioningState = () => {
    setTransitioning(true);
    setTimeout(() => {
      setTransitioning(false);
    }, 1100);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setChangeScoreBy(Number(changeScoreByInput));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeScoreByInput(e.target.value);
  };

  const handleIncreaseScore = () => {
    try {
      changeTransitioningState();

      appSocket.timeout(5000).emit(
        "player:increaseScore",
        {
          socketId: player.socketId,
          score: changeScoreBy,
        },
        (_: null, error: socketResponse, res: socketResponse) => {
          if (error) {
            toast({
              title: "Error: Something went wrong!",
              description: error.message,
              variant: "destructive",
            });
          }
          return res;
        },
      );
    } catch (error) {
      if (error instanceof Error)
        toast({
          title: "Error: Something went wrong!",
          description: error.message,
          variant: "destructive",
        });
    }
  };
  const handleDecreaseScore = () => {
    try {
      changeTransitioningState();

      appSocket.timeout(5000).emit(
        "player:decreaseScore",
        {
          socketId: player.socketId,
          score: changeScoreBy,
        },
        (_: null, error: socketResponse, res: socketResponse) => {
          if (error) {
            toast({
              title: "Error: Something went wrong!",
              description: error.message,
              variant: "destructive",
            });
          }
          return res;
        },
      );
    } catch (error) {
      if (error instanceof Error)
        toast({
          title: "Error: Something went wrong!",
          description: error.message,
          variant: "destructive",
        });
    }
  };

  return (
    <HoverCard>
      <AnimatePresence>
        <motion.div
          className="flex items-center justify-between rounded-3xl bg-brand-primary-foreground p-3 dark:bg-indigo-950"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, type: "spring" },
          }}
          exit={{
            opacity: 1,
            scale: 0.2,
            transition: { duration: 5, type: "spring" },
          }}
          key={player.socketId}
          layout
        >
          <div className="flex items-center justify-start gap-4">
            <Avatar>
              <AvatarImage src={player.avatar} alt="Avatar" />
              <AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <h3 className="text-sm font-semibold sm:text-lg">{player.name}</h3>
          </div>
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-lg font-bold">{player.score}</h3>
            <HoverCardTrigger>
              <Button className="rounded-full" variant="secondary" size="sm">
                <Pencil />
              </Button>
            </HoverCardTrigger>
          </div>
          {!transitioning && (
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
          )}
        </motion.div>
      </AnimatePresence>
    </HoverCard>
  );
};

export default PlayerScoreCard;
