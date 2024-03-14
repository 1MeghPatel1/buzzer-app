import { Toggle } from "@/components/ui/toggle";
import { useToast } from "@/components/ui/use-toast";
import { appSocket } from "@/socket/socket";
import useStore from "@/store/store";
import { socketResponse } from "@/utils/types";
import { useEffect, useState } from "react";
import buzzerSound from "/sounds/Buzz.mp3";

const BuzzerBox = () => {
  const roomState = useStore((state) => state.roomState);
  const playerInfo = useStore((state) => state.playerInfo);
  const soundOn = useStore((state) => state.soundOn);
  const { toast } = useToast();
  const [isBuzzed, setIsBuzzed] = useState(false);

  useEffect(() => {
    setIsBuzzed(
      !!roomState.buzzedPlayers.find(
        (player) => player.socketId === playerInfo.socketId,
      ),
    );
  }, [roomState.buzzedPlayers, playerInfo]);

  const handleBuzz = () => {
    try {
      if (isBuzzed) {
        return;
      }
      if (roomState.isBuzzersLocked) {
        return toast({
          title: "Buzzers are locked by Host",
          description: "Please wait untill buzzers are unlocked",
          variant: "destructive",
        });
      }
      setIsBuzzed(true);
      if (soundOn) {
        const audio = new Audio(buzzerSound);
        audio.play();
      }
      const payload = {
        roomCode: playerInfo.roomCode,
        playerName: playerInfo.name,
      };
      appSocket
        .timeout(5000)
        .emit(
          "room:buzz",
          payload,
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
        });
    }
  };
  return (
    <div className="row-span-2 flex min-h-full flex-col items-center justify-center gap-4 rounded-md border border-gray-100  bg-lime-300 bg-opacity-30 bg-clip-padding px-10 py-6 backdrop-blur-sm backdrop-filter sm:col-span-1 md:col-auto">
      <Toggle
        className="h-[15rem] w-[15rem] rounded-full border-4 bg-rose-400 shadow-2xl transition-all duration-150 hover:bg-rose-500 data-[state=on]:bg-lime-300 data-[state=off]:hover:-translate-y-2 data-[state=off]:hover:shadow-[0_1rem_1.5rem_rgba(0,0,0,0.2)] dark:hover:bg-red-500 dark:data-[state=on]:bg-amber-800"
        aria-label="Toggle italic"
        onPressedChange={handleBuzz}
        pressed={isBuzzed}
      >
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100">
          {isBuzzed ? "Buzzed" : "Buzz"}
        </h2>
      </Toggle>
    </div>
  );
};

export default BuzzerBox;
