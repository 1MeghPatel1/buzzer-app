import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useStore from "@/store/store";
import { LogOut, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
const RoomDetails = () => {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const roomState = useStore((state) => state.roomState);
  const handleSoundClick = () => {
    setIsSoundOn(!isSoundOn);
  };

  return (
    <div className="row-span-2 flex min-h-full flex-col items-center justify-center gap-4  rounded-md border border-gray-100 bg-orange-300  bg-opacity-30 bg-clip-padding px-10 py-6 backdrop-blur-sm backdrop-filter sm:col-span-1 md:col-span-1">
      <div className="flex flex-col items-start justify-between gap-6">
        <div className="w-[19rem]">
          <h2 className="text-2xl font-medium text-slate-700 dark:text-slate-100">
            Room Name
          </h2>
          <h3 className=" text-lg font-bold">{roomState.roomName}</h3>
        </div>
        <div className="w-[19rem]">
          <h2 className="text-2xl font-medium text-slate-700 dark:text-slate-100">
            Room Code
          </h2>
          <h3 className=" text-lg font-bold">{roomState.roomCode}</h3>
        </div>
        <div className="flex w-[19rem] items-center gap-4">
          <Button
            className="rounded-full"
            onClick={handleSoundClick}
            variant="secondary"
            size="icon"
          >
            {isSoundOn ? <VolumeX /> : <Volume2 />}
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="rounded-full"
                  variant="secondary"
                  size="icon"
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
