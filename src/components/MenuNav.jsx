import { PlayIcon } from "@heroicons/react/24/solid";
import MenuNavOption from "./MenuNavOption";
import { useNavigate } from "react-router-dom";
import { useSpotifyContext } from "../context/SpotifyProvider";

export default function MenuNav({ isPlay }) {
  const navigate = useNavigate();
  const { sdk } = useSpotifyContext();
  const options = [
    {
      name: "Leaderboard",
      routePath: "/leaderboard",
    },
    {
      name: "How to Play",
      routePath: "/how-to-play",
    },
    {
      name: "Settings",
      routePath: "/settings",
    },
  ];

  const logout = () => {
    sdk.logOut();
    navigate("/", { replace: true });
  };

  return (
    <section>
      <div
        className={`flex items-center font-bold text-6xl mb-5 ${
          !isPlay ? "opacity-25 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <span
          onClick={isPlay ? () => navigate("/play") : undefined}
          className='me-3'
        >
          Play
        </span>
        <PlayIcon className='play-icon h-12 w-12 text-light-green' />
      </div>
      {options.map((option) => {
        return (
          <MenuNavOption
            key={option.name}
            option={option.name}
            routePath={option.routePath}
          />
        );
      })}
      <div className='font-bold text-6xl mb-5'>
        <span
          onClick={logout}
          className="'font-bold text-6xl cursor-pointer mb-5 relative after:bg-light-green after:absolute after:h-1 after:w-0 after:bottom-2 after:left-0 hover:after:w-full after:transition-all after:duration-300 '"
        >
          Logout
        </span>
      </div>
    </section>
  );
}
