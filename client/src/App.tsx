import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/Home";
import Room from "./components/room/Room";
import { ThemeProvider } from "./components/ui/theme-provider";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/room",
		element: <Room />,
	},
]);

const App = () => {
	return (
		<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
			<RouterProvider router={router} />;
		</ThemeProvider>
	);
};

export default App;
