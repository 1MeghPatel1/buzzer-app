import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/Home";
import Room from "./components/room/Room";
import { ThemeProvider } from "./components/ui/theme-provider";
import Player from "./components/room/player/Player";
import Host from "./components/room/host/Host";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/room",
    element: <Room />,
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
    </ThemeProvider>
  );
};

export default App;
