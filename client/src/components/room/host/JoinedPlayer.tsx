import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Player } from "@/store/store";
import { Trash2 } from "lucide-react";

const JoinedPlayer = ({ player }: { player: Player }) => {
  return (
    <div className="flex items-center justify-between rounded-3xl bg-brand-primary-foreground p-3 dark:bg-teal-700">
      <div className="flex items-center justify-start gap-4">
        <Avatar>
          <AvatarImage src={player.avatar} alt="Avatar" />
          <AvatarFallback> {player.name.substring(0, 2)}</AvatarFallback>
        </Avatar>

        <h3 className="text-lg font-semibold">{player.name}</h3>
      </div>
      <Button variant="destructive" size="icon" className="rounded-full">
        <Trash2 />
      </Button>
    </div>
  );
};

export default JoinedPlayer;
