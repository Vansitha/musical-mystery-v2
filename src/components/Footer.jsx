import React from "react";
import spotifyIcon from "../assets/spotify-icon.png";

export default function Footer({ displayPosition }) {
  return (
    <footer className={`flex justify-${displayPosition}`}>
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
  );
}
