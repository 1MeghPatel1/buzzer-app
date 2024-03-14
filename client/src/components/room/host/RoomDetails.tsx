import { Button } from "@/components/ui/button";
import {
  Lock,
  LogOut,
  RefreshCcwDot,
  Unlock,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import useStore from "@/store/store";
import { appSocket } from "@/socket/socket";
import { socketResponse } from "@/utils/types";
import { useToast } from "@/components/ui/use-toast";
const RoomDetails = () => {
  const [isBuzzersLocked, setIsBuzzersLocked] = useState(false);
  const roomState = useStore((state) => state.roomState);
  const soundOn = useStore((state) => state.soundOn);
  const toggleSoundOn = useStore((state) => state.toggleSoundOn);
  const { toast } = useToast();

  const handleSoundClick = () => {
    toggleSoundOn(soundOn);
  };

  const handleLeaveClick = () => {
    appSocket.disconnect();
    window.location.reload();
  };

  const handleResetClick = () => {
    try {
      appSocket
        .timeout(5000)
        .emit(
          "room:resetBuzzers",
          { roomCode: roomState.roomCode },
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

  const handleLockClick = () => {
    try {
      setIsBuzzersLocked(!isBuzzersLocked);
      if (isBuzzersLocked) {
        appSocket
          .timeout(5000)
          .emit(
            "room:unlockBuzzers",
            { roomCode: roomState.roomCode },
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
      } else {
        appSocket
          .timeout(5000)
          .emit(
            "room:lockBuzzers",
            { roomCode: roomState.roomCode },
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
      }
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
    <div className="col-start-1 row-start-1 flex min-h-full min-w-[15rem] flex-col justify-around gap-4 rounded-md border border-gray-100 bg-orange-300 bg-opacity-50  bg-clip-padding p-8 shadow-2xl backdrop-blur-sm backdrop-filter dark:bg-gray-300 dark:bg-opacity-30 sm:row-span-1 lg:col-span-2">
      <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-10  xl:gap-32">
        <div className="w-[15rem] lg:w-[18rem]">
          <h2 className="text-2xl font-medium text-slate-700 dark:text-slate-100">
            Room Name
          </h2>
          <h3 className=" text-lg font-bold">{roomState.roomName}</h3>
        </div>
        <div className="w-[15rem]">
          <h2 className="text-2xl font-medium text-slate-700 dark:text-slate-100">
            Room Code
          </h2>
          <h3 className=" text-lg font-bold">{roomState.roomCode}</h3>
        </div>
        <div className="flex w-[15rem] items-center gap-4">
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
                  onClick={handleResetClick}
                >
                  <RefreshCcwDot />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset all Buzzers!</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="rounded-full"
                  variant="secondary"
                  size="icon"
                  onClick={handleLockClick}
                >
                  {isBuzzersLocked ? <Lock /> : <Unlock />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isBuzzersLocked ? "Unlock Buzzers" : "Lock Buzzers"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
