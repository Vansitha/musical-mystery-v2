import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { appRoutes, AUTH_TOKEN_KEY } from "../constants";
import { BlobEffect } from "../components/BlobEffects";
import toast, { Toaster } from "react-hot-toast";
import Button from "../components/Button";
import useSpotifyAuth from "../hooks/useSpotifyAuth";

// Toast messages
const CONNECTED_NOTIFY = "Connected Successfully";
const WELCOME_NOTIFY = "Welcome back!";
const ERROR_NOTIFY = "Could not connect with Spotify";

// URl params for spotify auth
const CODE_PARAM = "code";
const ERROR_PARAM = "error";

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let [searchParams] = useSearchParams();
  const triggerAuth = useSpotifyAuth();
  const navigate = useNavigate();

  const loginHandler = async () => await triggerAuth();

  const goToMainMenuHandler = async () => {
    await triggerAuth(); // Called to initialize the SDK instance after redirect
    navigate(appRoutes.mainMenu, { replace: true });
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
  }, [searchParams]);

  return (
    <div className='container mx-auto h-screen flex flex-col items-center justify-center'>
      <h1 className='text-4xl md:text-9xl mb-11 font-extrabold italic'>
        Musical <span style={textStrokeStyle.outlineText}>Mystery</span>
      </h1>
      <h2 className='text-center text-sm md:mt-10 md:text-2xl'>
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
        styles='mt-5 md:mt-10 md:w-80'
        text={isLoggedIn ? "Game Menu" : "Connect"}
        callback={isLoggedIn ? goToMainMenuHandler : loginHandler}
      />
      <p className='absolute bottom-0 text-xs mb-5 px-10 text-center'>
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

const textStrokeStyle = {
  outlineText: {
    WebkitTextStroke: "3px #1ED79F",
    WebkitTextFillColor: "transparent",
  },
};
