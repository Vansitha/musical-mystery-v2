import spotifyIcon from "../assets/spotify-icon.png";
import { Link } from "react-router-dom";

export default function Footer({
  displayPosition,
  enableMenuCallBack,
  callbackHanlder,
}) {
  return (
    <footer className={`flex justify-${displayPosition}`}>
      {enableMenuCallBack && (
        <>
          <Link
            onClick={callbackHanlder}
            className='underline opacity-80'
            to='/main-menu'
          >
            Back to Game Menu
          </Link>
          <p>&nbsp; | &nbsp;</p>
        </>
      )}
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
