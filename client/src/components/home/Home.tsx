import { ModeToggle } from "../ui/mode-toggle";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import Intro from "./Intro";

const Home = () => {
  return (
    <div className="min-h-svh bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 font-body dark:bg-gradient-to-br dark:from-stone-800 dark:via-stone-950 dark:to-stone-900">
      <div className=" min-h-svh min-w-full overflow-hidden">
        <div className=" absolute z-10 h-full w-full rounded-md border border-gray-100 bg-gray-700 bg-opacity-30 bg-clip-padding blur-3xl dark:bg-opacity-30"></div>
        <div className="content-container relative z-20">
          <nav className="flex h-full min-h-24 w-full items-center justify-between rounded-md border border-gray-100 bg-purple-100 bg-opacity-20 bg-clip-padding px-10 shadow-xl backdrop-blur-sm backdrop-filter">
            <h1 className="text-2xl font-semibold tracking-wider text-[#e11d48] dark:text-primary-foreground">
              Albiorix Technology Pvt Ltd.
            </h1>
            <ModeToggle />
          </nav>
          <main className="main-container flex min-h-[30rem] w-full flex-wrap items-center justify-center gap-6 p-4">
            <div className="forms flex flex-col gap-4">
              <JoinRoom />
              <CreateRoom />
            </div>
            <Intro />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
