import { Outlet, useNavigate } from "react-router-dom";
import { ModeToggle } from "../ui/mode-toggle";
import useStore from "@/store/store";
import { useEffect } from "react";

const Room = () => {
  const playerInfo = useStore((state) => state.playerInfo);
  const navigate = useNavigate();
  useEffect(() => {
    if (!playerInfo.name.length) {
      navigate("/");
    } else {
      if (playerInfo.isHost) {
        return navigate("/room/host");
      } else {
        return navigate("/room/player");
      }
    }
  }, [playerInfo, navigate]);
  return (
    <div className="min-h-svh bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 dark:bg-gradient-to-br dark:from-stone-800 dark:via-stone-950 dark:to-stone-900">
      <div className=" flex min-h-svh min-w-full items-center justify-center overflow-hidden">
        <div className=" absolute z-10 h-full w-full rounded-md border border-gray-100 bg-gray-700 bg-opacity-35 bg-clip-padding blur-3xl dark:bg-opacity-30"></div>
        <div className="relative z-20 w-[90%] pt-5">
          <nav className="absolute right-2 top-2 lg:-right-5 lg:top-7">
            <ModeToggle />
          </nav>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Room;
