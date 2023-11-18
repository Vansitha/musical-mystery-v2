import React, { useEffect, useState } from "react";
import spotifyIcon from "../assets/spotify-icon.png";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useSpotifyContext } from "../SpotifyProvider";
import FallbackAvatarImg from "../assets/fallback-avatar.png";

export default function MainMenu() {
  const { sdk } = useSpotifyContext();
  const [userDetails, setUserDetails] = useState({
    name: "User",
    profileImage: FallbackAvatarImg,
  });
  const [play, setPlay] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await sdk?.currentUser.profile();
      if (user) {
        setUserDetails({
          name: user?.display_name || "User",
          profileImage: user?.images[0]?.url || FallbackAvatarImg,
        });

        if (user.product === "premium") {
          setPlay(true);
        }
      }
    })();
  }, []);

  return (
    <div className='container h-screen flex flex-col justify-around mx-auto'>
      <header className='flex justify-between items-center'>
        <div className='flex'>
          <h2 className='font-title text-2xl me-2'>Musical Mystery</h2>
        </div>
        <div className='flex items-center'>
          <p>Hi {userDetails.name}!</p>
          <img
            className='h-10 w-10 rounded-full ms-4 object-cover object-center'
            src={userDetails.profileImage}
            alt='User spotify profile image'
          />
        </div>
      </header>
      <section>
        <div className='flex items-center font-bold text-6xl cursor-pointer mb-5'>
          <span className='me-3'>Play</span>
          <PlayIcon className='play-icon h-12 w-12 text-light-green' />
        </div>
        <div className='font-bold text-6xl mb-5'>
          <span className="'font-bold text-6xl cursor-pointer mb-5 relative after:bg-light-green after:absolute after:h-1 after:w-0 after:bottom-2 after:left-0 hover:after:w-full after:transition-all after:duration-300 '">
            Leaderboard
          </span>
        </div>

        <div className='font-bold text-6xl mb-5'>
          <span className="'font-bold text-6xl cursor-pointer mb-5 relative after:bg-light-green after:absolute after:h-1 after:w-0 after:bottom-2 after:left-0 hover:after:w-full after:transition-all after:duration-300 '">
            How to Play
          </span>
        </div>
        <div className='font-bold text-6xl mb-5'>
          <span className="'font-bold text-6xl cursor-pointer mb-5 relative after:bg-light-green after:absolute after:h-1 after:w-0 after:bottom-2 after:left-0 hover:after:w-full after:transition-all after:duration-300 '">
            Settings
          </span>
        </div>
        <div className='font-bold text-6xl'>
          <span className="'font-bold text-6xl cursor-pointer mb-5 relative after:bg-light-green after:absolute after:h-1 after:w-0 after:bottom-2 after:left-0 hover:after:w-full after:transition-all after:duration-300 '">
            Logout
          </span>
        </div>
      </section>
      <footer>
        <div className='flex items-center'>
          Powered by
          <span className='text-light-green font-bold mx-1'> Spotify </span>API
          <img
            className='ms-1 inline-block h-6 w-6 rounded-full'
            src={spotifyIcon}
            alt='Spotify Logo'
          />
        </div>
      </footer>
    </div>
  );
}
