import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

const RoomDetails = () => {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const handleSoundClick = () => {
    setIsSoundOn(!isSoundOn);
  };

  return (
    <div className="flex min-h-full flex-col justify-around gap-4 rounded-md border border-gray-100 bg-orange-300 bg-opacity-50  bg-clip-padding p-8 shadow-2xl backdrop-blur-sm backdrop-filter dark:bg-gray-300 dark:bg-opacity-30 sm:col-span-2 sm:row-span-1">
      <div className="flex items-center  gap-32">
        <div className="w-[18rem]">
          <h2 className="text-2xl font-semibold">Room Name</h2>
          <h3 className=" text-xl font-bold">Albiorix Buzzer Room</h3>
        </div>
        <div className="w-[15rem]">
          <h2 className="text-2xl font-semibold">Room Code</h2>
          <h3 className=" text-xl font-bold">785sadfg55</h3>
        </div>
        <div className="w-[15rem]">
          <Button
            className="rounded-full"
            onClick={handleSoundClick}
            variant="secondary"
            size="sm"
          >
            {isSoundOn ? <VolumeX /> : <Volume2 />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
