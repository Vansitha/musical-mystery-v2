import { ForwardIcon, PlayIcon } from "@heroicons/react/24/solid";
import MenuNavOption from "./MenuNavOption";
import { useNavigate } from "react-router-dom";
import { useSpotifyContext } from "../../context/SpotifyProvider";
import { motion } from "framer-motion";
import { useState } from "react";

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

export default function MenuNav({ isPlay }) {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const { sdk } = useSpotifyContext();

  const logout = () => {
    sdk.logOut();
    navigate("/", { replace: true });
  };

  return (
    <section>
      <motion.div
        onHoverStart={() => isPlay && setHover(true)}
        onHoverEnd={() => isPlay && setHover(false)}
        className={`flex items-center font-bold text-6xl mb-5 h-16 w-fit ${
          !isPlay ? "opacity-25 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <span
          onClick={isPlay ? () => navigate("/play") : undefined}
          className='me-3'
        >
          Play
        </span>
        <motion.div>
          {!hover ? (
            <motion.div>
              <PlayIcon className='play-icon h-12 w-12 text-light-green' />
            </motion.div>
          ) : (
            <motion.div animate={{ x: 10 }} transition={{ duration: 0.2 }}>
              <ForwardIcon className='play-icon h-16 w-16 text-light-green' />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
      {options.map((option) => {
        return (
          <MenuNavOption
            key={option.name}
            option={option.name}
            routePath={option.routePath}
          />
        );
      })}
      <div className='font-bold text-6xl mb-5 w-fit'>
        <span
          onClick={logout}
          className='font-bold text-6xl cursor-pointer mb-5 relative after:bg-light-green after:absolute after:h-1 after:w-0 after:bottom-2 after:left-0 hover:after:w-full after:transition-all after:duration-300'
        >
          Logout
        </span>
      </div>
    </section>
  );
}
