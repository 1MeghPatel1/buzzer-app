const Player = () => {
  return (
    <div className="grid min-h-svh w-full grid-cols-1 items-start gap-4 px-2 py-14 sm:grid-cols-1 md:grid-cols-3 md:grid-rows-4">
      <div className="row-span-2 flex min-h-full flex-col gap-4  rounded-md border border-gray-100 bg-gray-300  bg-opacity-30 bg-clip-padding px-10 py-6 backdrop-blur-sm backdrop-filter sm:col-span-1 md:col-span-1"></div>
      <div className="row-span-2 flex min-h-full flex-col gap-4 rounded-md border border-gray-100  bg-gray-300 bg-opacity-30 bg-clip-padding px-10 py-6 backdrop-blur-sm backdrop-filter sm:col-span-1 md:col-auto"></div>
      <div className="row-span-full flex min-h-full flex-col gap-4 rounded-md border border-gray-100 bg-gray-300  bg-opacity-30 bg-clip-padding px-10 py-6 backdrop-blur-sm backdrop-filter sm:col-span-1 md:col-start-3"></div>
      <div className="row-span-2 flex min-h-full flex-col gap-4 rounded-md border border-gray-100  bg-gray-300 bg-opacity-30 bg-clip-padding px-10 py-6 backdrop-blur-sm backdrop-filter sm:col-span-1 md:col-auto"></div>
      <div className="row-span-2 flex min-h-full flex-col gap-4 rounded-md border border-gray-100  bg-gray-300 bg-opacity-30 bg-clip-padding px-10 py-6 backdrop-blur-sm backdrop-filter sm:col-span-1 md:col-auto"></div>
      Player
    </div>
  );
};

export default Player;
