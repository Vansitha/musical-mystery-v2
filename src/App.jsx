import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import Instructions from "./pages/Instructions";
import GameOver from "./pages/GameOver";
import MainMenu from "./pages/MainMenu";
import GameScreen from "./pages/GameScreen";

function App() {
  return (
    <div className='font-body text-white font-medium'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/main-menu' element={<MainMenu />} />
        <Route path='/play' element={<GameScreen />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/instructions' element={<Instructions />} />
        <Route path='/game-over' element={<GameOver />} />
      </Routes>
    </div>
  );
}

export default App;
