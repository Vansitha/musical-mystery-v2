import Login from "./pages/Login";
import MainMenu from "./pages/MainMenu";
import GameScreen from "./pages/GameScreen";
import Leaderboard from "./pages/Leaderboard";
import GameOver from "./pages/GameOver";
import Instructions from "./pages/Instructions";
import Settings from "./pages/Settings";

export const privateRoutes = [
  { path: "/", element: <MainMenu /> },
  { path: "/play", element: <GameScreen /> },
  { path: "/leaderboard", element: <Leaderboard /> },
  { path: "/settings", element: <Settings /> },
  { path: "/instructions", element: <Instructions /> },
  { path: "/game-over", element: <GameOver /> },
];

export const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
];
