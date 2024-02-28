import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Pencil } from "lucide-react";

const PlayerScoreCard = () => {
  return (
    <HoverCard>
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
          <HoverCardTrigger>
            <Button className="rounded-full" variant="secondary" size="sm">
              <Pencil />
            </Button>
          </HoverCardTrigger>
        </div>
        <HoverCardContent className="w-30 flex flex-col gap-3">
          <div className="flex w-full items-center space-x-4">
            <Input type="text" placeholder="Increase Score By" />
            <Button
              className="w-[3.3rem] rounded-full"
              variant="outline"
              size="icon"
            >
              <CheckCircle2 />
            </Button>
          </div>
          <div className="flex justify-center gap-4">
            <Button className="rounded-full" variant="ghost" size="icon">
              +10
            </Button>
            <Button className="rounded-full" variant="ghost" size="icon">
              -10
            </Button>
          </div>
        </HoverCardContent>
      </div>
    </HoverCard>
  );
};

export default PlayerScoreCard;
