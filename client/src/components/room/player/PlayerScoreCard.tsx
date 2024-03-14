import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Player } from "@/store/store";
import { AnimatePresence, motion } from "framer-motion";

const PlayerScoreCard = ({ player }: { player: Player }) => {
  return (
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
        <div className="mr-2 flex items-center justify-center gap-2">
          <h3 className="text-lg font-bold">{player.score}</h3>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PlayerScoreCard;
