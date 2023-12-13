import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import Instructions from "./pages/Instructions";
import GameOver from "./pages/GameOver";
import MainMenu from "./pages/MainMenu";
import GameScreen from "./pages/GameScreen";
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "./pages/ErrorPage";
import TempOverlayWrapper from "./pages/TempOverlayWrapper";

function App() {
  return (
    <div className='font-body text-white font-medium'>
      <Routes>
        <Route element={<TempOverlayWrapper />}>
          <Route path='/' element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/main-menu' element={<MainMenu />}  />
            <Route path='/play' element={<GameScreen />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/how-to-play' element={<Instructions />} />
            <Route path='/game-over' element={<GameOver />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
