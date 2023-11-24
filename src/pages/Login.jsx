import { useEffect, useState } from "react";
import Button from "../components/Button";
import useSpotifyAuth from "../hooks/useSpotifyAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const AUTH_TOKEN_KEY = "spotify-sdk:AuthorizationCodeWithPKCEStrategy:token";
const CONNECTED_NOTIFY = "Connected Successfully";
const WELCOME_NOTIFY = "Welcome back!";
const ERROR_NOTIFY = "Error connecting to Spotify";
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
      <motion.div
        animate={{
          x: [0, 100, 0],
          rotate: [0, 350], // Rotate from 0 to 350 degrees (and continue)
          skewX: [-10, 0, -10], // SkewX from -10 to 0 and back
        }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }} // Adjust duration for a full rotation
        style={circle2Style}
        className='h-20 w-20 rounded-full bg-jade -z-10 fixed top-96 -left-80'
      />
      <motion.div
        animate={{
          x: [0, 100, 0],
          rotate: [0, 350], // Rotate from 0 to 350 degrees (and continue)
          skewX: [-10, 0, -10], // SkewX from -10 to 0 and back
        }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }} // Adjust duration for a full rotation
        style={circle2Style}
        className='h-20 w-20 rounded-full bg-jade -z-10 fixed top-0 -right-96'
      />
    </div>
  );
}

const customStrokeStyle = {
  outlineText: {
    WebkitTextStroke: "5px #1ED79F",
    WebkitTextFillColor: "transparent",
  },
};

const circle2Style = {
  background: "linear-gradient(180deg, #27A7FF 0%, #FF3F3F 100%)",
  filter: "blur(120.849998474121094px)",
  width: "54.75rem",
  height: "57.625rem",
};
