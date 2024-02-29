import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PlayerScoreCard = () => {
  return (
    <div className="flex items-center justify-between rounded-3xl bg-brand-primary-foreground p-3 dark:bg-indigo-950">
      <div className="flex items-center justify-start gap-4">
        <Avatar>
          <AvatarImage
            src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Bandit&radius=50&backgroundColor=b6e3f4"
            alt="Avatar"
          />
          <AvatarFallback>Initials</AvatarFallback>
        </Avatar>
        <h3 className="text-lg font-semibold">John Doe</h3>
      </div>
      <div className="flex items-center justify-center gap-2">
        <h3 className="text-lg font-bold">100 points</h3>
      </div>
    </div>
  );
};

export default PlayerScoreCard;
