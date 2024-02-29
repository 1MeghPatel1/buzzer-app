import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";

const BuzzerBox = () => {
  const [isBuzzed, setIsBuzzed] = useState(false);
  const handleBuzz = () => {
    setIsBuzzed(true);
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
