import { useEffect, useState } from "react";
import Button from "../components/button/Button";
import useSpotifyAuth from "../hooks/useSpotifyAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const triggerAuth = useSpotifyAuth();
  const sotrageKey = "spotify-sdk:verifier";
  const navigate = useNavigate();
  const [accessApp, setAccessApp] = useState(false);

  async function loginHandler() {
    await triggerAuth();
  }

  async function launchAppBtn() {
    await triggerAuth();
    navigate("/main-menu");
  }

  useEffect(() => {
    if (localStorage.getItem(sotrageKey)) {
      setAccessApp(true);
    }
  }, []);

  return (
    <div className='container mx-auto h-screen flex flex-col items-center justify-center'>
      <h1 className='font-title text-9xl mb-11'>Musical Mystery</h1>
      <h2 className='mt-10 text-2xl'>
        Login to your
        <span className='font-bold text-light-green'> Spotify </span>to start
        Playing
      </h2>
      {accessApp ? (
        <Button styles='mt-10 w-80' text='Game Menu' callback={launchAppBtn} />
      ) : (
        <Button styles='mt-10 w-80' text='Login' callback={loginHandler} />
      )}
      <p className='mt-28 text-xs'>
        Note: Requires a
        <span className='font-bold text-light-green'> Spotify </span>Premium
        subscription to play
      </p>
    </div>
  );
}
