import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { appSocket } from "@/socket/socket";
import { Player } from "@/store/store";
import { socketResponse } from "@/utils/types";
import { Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const JoinedPlayer = ({ player }: { player: Player }) => {
  const { toast } = useToast();

  const handleClick = () => {
    try {
      appSocket
        .timeout(5000)
        .emit(
          "room:removePlayer",
          { socketId: player.socketId },
          (_: null, error: socketResponse, res: socketResponse) => {
            if (error) {
              toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
              });
            }
            return res;
          },
        );
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        className="col-span-1 col-start-1 flex items-center justify-between rounded-3xl bg-brand-primary-foreground p-3 dark:bg-teal-700"
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
            <AvatarFallback> {player.name.substring(0, 2)}</AvatarFallback>
          </Avatar>

          <h3 className="text-sm font-semibold sm:text-lg">{player.name}</h3>
        </div>
        <Button
          variant="destructive"
          size="icon"
          className="rounded-full"
          onClick={handleClick}
        >
          <Trash2 />
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};

export default JoinedPlayer;
