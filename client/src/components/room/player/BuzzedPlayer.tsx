import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Player } from "@/store/store";

const BuzzedPlayer = ({ player }: { player: Player }) => {
  return (
    <div className="flex items-center justify-between rounded-3xl bg-brand-primary-foreground p-3 dark:bg-rose-500">
      <div className="flex items-center justify-start gap-4">
        <Avatar>
          <AvatarImage src={player.avatar} alt="Avatar" />
          <AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
        </Avatar>

        <h3 className="text-lg font-semibold">{player.name}</h3>
      </div>
    </div>
  );
};

export default BuzzedPlayer;
