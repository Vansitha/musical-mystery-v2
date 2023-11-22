import { useEffect, useState } from "react";
import Button from "../components/Button";
import useSpotifyAuth from "../hooks/useSpotifyAuth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const VERIFIER_TOKEN_KEY = "spotify-sdk:verifier";
const AUTH_TOKEN_KEY = "spotify-sdk:AuthorizationCodeWithPKCEStrategy:token";
const CONNECTED_NOTIFY = "Connected Successfully";
const WELCOME_NOTIFY = "Welcome back!";
const MAIN_MENU = "/main-menu";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const triggerAuth = useSpotifyAuth();
  const navigate = useNavigate();

  const notify = (message) => toast.success(message);

  const loginHandler = async () => {
    await triggerAuth();
  };

  const goToMainMenuHandler = async () => {
    // Called for the second time after login redirect back to app to get SDK instance
    await triggerAuth();
    navigate(MAIN_MENU, { replace: true });
  };

  useEffect(() => {
    const verifierToken = localStorage.getItem(VERIFIER_TOKEN_KEY);
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);

    if (verifierToken) {
      notify(CONNECTED_NOTIFY);
    } else if (authToken) {
      notify(WELCOME_NOTIFY);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className='container mx-auto h-screen flex flex-col items-center justify-center'>
      <h1 className='font-title text-9xl mb-11'>Musical Mystery</h1>
      <h2 className='mt-10 text-2xl'>
        {isLoggedIn ? (
          <>
            Ready to rock! Your
            <span className='font-bold text-light-green'> Spotify </span>{" "}
            account is connected
          </>
        ) : (
          <>
            Login to your
            <span className='font-bold text-light-green'> Spotify </span>{" "}
            account to start playing
          </>
        )}
      </h2>
      <Button
        styles='mt-10 w-80'
        text={isLoggedIn ? "Game Menu" : "Connect"}
        callback={isLoggedIn ? goToMainMenuHandler : loginHandler}
      />
      <p className='mt-28 text-xs'>
        Note: Requires a
        <span className='font-bold text-light-green'> Spotify </span> Premium
        subscription for music playback
      </p>
      <Toaster position='top-center' reverseOrder={false} />
    </div>
  );
};

export default Login;
