import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { removeItem } from "@/services/localStorageServices";
import { appSocket } from "@/socket/socket";
import useStore from "@/store/store";
import { LogOut, Volume2, VolumeX } from "lucide-react";

const RoomDetails = () => {
  const roomState = useStore((state) => state.roomState);
  const soundOn = useStore((state) => state.soundOn);
  const toggleSoundOn = useStore((state) => state.toggleSoundOn);
  const handleSoundClick = () => {
    toggleSoundOn(soundOn);
  };
  const handleLeaveClick = () => {
    appSocket.timeout(5000).emit("room:disconnect");
    removeItem("playerInfo");
    window.location.reload();
  };

  return (
    <div className="row-span-2 flex min-h-full flex-col items-center justify-center gap-4  rounded-md border border-gray-100 bg-orange-300  bg-opacity-30 bg-clip-padding px-10 py-6 backdrop-blur-sm backdrop-filter sm:col-span-1 md:col-span-1">
      <div className="flex flex-col items-start justify-between gap-6">
        <div className="sm:w-[19rem]">
          <h2 className="font-medium text-slate-700 dark:text-slate-100 sm:text-2xl">
            Room Name
          </h2>
          <h3 className=" text-lg font-bold">{roomState.roomName}</h3>
        </div>
        <div className="sm:w-[19rem]">
          <h2 className="font-medium text-slate-700 dark:text-slate-100 sm:text-2xl">
            Room Code
          </h2>
          <h3 className=" text-lg font-bold">{roomState.roomCode}</h3>
        </div>
        <div className="flex items-center gap-4 sm:w-[19rem]">
          <Button
            className="rounded-full"
            onClick={handleSoundClick}
            variant="secondary"
            size="icon"
          >
            {soundOn ? <Volume2 /> : <VolumeX />}
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="rounded-full"
                  variant="secondary"
                  size="icon"
                  onClick={handleLeaveClick}
                >
                  <LogOut />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Leave Room</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
