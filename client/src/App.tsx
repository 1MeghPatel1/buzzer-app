import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/Home";
import Room from "./components/room/Room";
import { ThemeProvider } from "./components/ui/theme-provider";
import Player from "./components/room/player/Player";
import Host from "./components/room/host/Host";
import Events from "./socket/Events";
import { Toaster } from "./components/ui/toaster";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Events>
        <Home />
      </Events>
    ),
  },
  {
    path: "/room",
    element: (
      <Events>
        <Room />
      </Events>
    ),
    children: [
      {
        index: true,
        path: "player",
        element: <Player />,
      },
      {
        path: "host",
        element: <Host />,
      },
    ],
  },
]);

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
