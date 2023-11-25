import { useEffect, useState } from "react";
import Button from "../components/Button";
import useSpotifyAuth from "../hooks/useSpotifyAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { BlobEffect } from "../components/BlobEffects";

const AUTH_TOKEN_KEY = "spotify-sdk:AuthorizationCodeWithPKCEStrategy:token";
const CONNECTED_NOTIFY = "Connected Successfully";
const WELCOME_NOTIFY = "Welcome back!";
const ERROR_NOTIFY = "Could not connect with Spotify";
const MAIN_MENU = "/main-menu";

const CODE_PARAM = "code";
const ERROR_PARAM = "error";

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const triggerAuth = useSpotifyAuth();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const loginHandler = async () => {
    await triggerAuth();
  };

  const goToMainMenuHandler = async () => {
    // Called for the second time after login redirect back to app to get SDK instance
    await triggerAuth();
    navigate(MAIN_MENU, { replace: true });
  };

  useEffect(() => {
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);

    if (searchParams.has(ERROR_PARAM)) {
      toast.error(ERROR_NOTIFY);
    } else if (searchParams.has(CODE_PARAM)) {
      toast.success(CONNECTED_NOTIFY);
      setIsLoggedIn(true);
    } else if (authToken) {
      toast(WELCOME_NOTIFY, { icon: "👋" });
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className='container mx-auto h-screen flex flex-col items-center justify-center'>
      <h1 className='text-9xl mb-11 font-extrabold italic'>
        Musical <span style={customStrokeStyle.outlineText}>Mystery</span>
      </h1>
      <h2 className='mt-10 text-2xl'>
        {isLoggedIn ? (
          <>
            Ready to rock! Your
            <span className='font-bold text-light-green'> Spotify </span>{" "}
            account is connected
          </>
        ) : (
          <>
            Login with your
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
      <p className='mt-28 text'>
        Note: Requires a
        <span className='font-bold text-light-green'> Spotify </span> Premium
        subscription for music playback
      </p>
      <Toaster position='top-center' reverseOrder={false} />
      <BlobEffect position='top-96 -left-80' style='style-2' />
      <BlobEffect position='top-0 -right-96' style='style-2' />
    </div>
  );
}

const customStrokeStyle = {
  outlineText: {
    WebkitTextStroke: "5px #1ED79F",
    WebkitTextFillColor: "transparent",
  },
};
