import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const JoinedPlayer = () => {
  return (
    <div className="flex items-center justify-between rounded-3xl bg-brand-primary-foreground p-3 dark:bg-teal-700">
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
      <Button variant="destructive" size="icon" className="rounded-full">
        <Trash2 />
      </Button>
    </div>
  );
};

export default JoinedPlayer;
