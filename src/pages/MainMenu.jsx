import React from "react";
import spotifyIcon from "../assets/spotify-icon.png";
import { PlayIcon } from "@heroicons/react/24/solid";

export default function MainMenu() {
  return (
    <div className='container h-screen flex flex-col justify-around mx-auto'>
      <header className='flex justify-between items-center'>
        <div className='flex'>
          <h2 className='font-title text-2xl me-2'>Musical Mystery</h2>
          <span className='inline-flex items-center rounded-md bg-none px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-light-green'>
            Beta
          </span>
        </div>
        <div className='flex items-center'>
          <p>Hi Tom Cook!</p>
          <img
            className='h-10 w-10 rounded-full ms-4'
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
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
