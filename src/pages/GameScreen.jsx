import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Button from "../components/Button";
import ToggleButton from "../components/ToggleButton";
import Footer from "../components/Footer";
import GameInfoPanel from "../components/GameInfoPanel";
import PlayBack from "../components/PlayBack";
import useSpotifyPlayer from "../hooks/useSpotifyPlayer";
import { BlobEffect } from "../components/BlobEffects";

const SCORE_INCREMENT_VALUE = 10;
const LIVES_DECREMENT_VALUE = 1;
const TIMER_VALUE = 20;

export default function GameScreen() {
  const { play, pause, getRandomTracks, getProgress, isLoading } =
    useSpotifyPlayer();
  const navigate = useNavigate();
  const countdownIntervalId = useRef();
  const gameOverTimeoutId = useRef();
  const [countDown, setCountDown] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [tracks, setTracks] = useState({
    correctTrack: {
      id: "",
      name: "",
    },
    allTracks: [],
  });

  useEffect(() => {
    if (startGame === false && !tracks.correctTrack.id) return;

    countdownIntervalId.current = setInterval(() => {
      (async () => {
        const seconds = await getProgress();
        setCountDown(TIMER_VALUE - Math.ceil(seconds));
      })();
      // setCountDown((prev) => prev - 1);
    }, 1000);

    // Clear the interval when the game is paused
    return () => clearInterval(countdownIntervalId.current);
  }, [startGame, tracks]);

  useEffect(() => {
    if (!countdownIntervalId.current) return;

    if (countDown === 0) {
      const newLives = lives - LIVES_DECREMENT_VALUE;
      if (newLives == 0) {
        toast("Game over! You have no lives left.", { icon: "💔" });
        pause();
        clearInterval(countdownIntervalId.current);
        setLives(newLives);

        gameOverTimeoutId.current = setTimeout(() => {
          navigate("/game-over", { replace: true, state: { score } });
        }, 4000);

        return;
      }

      setLives(newLives);
      (async () => pickAndPlayTrack())();
      clearInterval(countdownIntervalId.current);
    }
  }, [countDown]);

  // Step 1
  async function pickAndPlayTrack() {
    const randomTracks = getRandomTracks();
    const correctTrack = randomTracks[Math.floor(Math.random() * 3)];
    console.log("old", tracks, "new", randomTracks);
    setTracks({
      correctTrack,
      allTracks: randomTracks,
    });
    play(correctTrack.id);
    const seconds = await getProgress();
    setCountDown(TIMER_VALUE - Math.ceil(seconds));
  }

  // Step 2
  function playInitialSongHanlder() {
    setStartGame((prev) => !prev);
    pickAndPlayTrack();
  }

  // Step 3 - User clicks on button
  function answerBtnClickHandler(btnText) {
    if (tracks.correctTrack.name === btnText) {
      setScore((prev) => prev + SCORE_INCREMENT_VALUE);
    } else {
      const newLives = lives - LIVES_DECREMENT_VALUE;

      if (newLives == 0) {
        toast("Game over! You have no lives left.", { icon: "💔" });
        pause();
        clearInterval(countdownIntervalId.current);
        setLives(newLives);

        setTimeout(() => {
          navigate("/game-over", { replace: true, state: { score } });
        }, 4000);

        return;
      }
      setLives(newLives);
    }
    pickAndPlayTrack();
  }

  function cleanUp() {
    pause();
    clearInterval(countdownIntervalId.current);
    clearTimeout(gameOverTimeoutId.current);
  }

  return (
    <div className='h-screen container mx-auto px-24 flex flex-col justify-around'>
      <Toaster position='top-center' reverseOrder={true} />
      <GameInfoPanel score={score} lives={lives} />
      <PlayBack totalTime={TIMER_VALUE} countdown={countDown} />
      <section className='flex justify-evenly pt-10'>
        {!startGame ? (
          <Button
            isDisabled={isLoading}
            text={isLoading ? "Loading..." : "Play Music!"}
            callback={playInitialSongHanlder}
          />
        ) : (
          <>
            {tracks.allTracks.map((track) => {
              return (
                <ToggleButton
                  key={Math.random() + track.id}
                  text={isLoading ? "Loading..." : track.name}
                  isLoading={isLoading}
                  callback={answerBtnClickHandler}
                />
              );
            })}
          </>
        )}
      </section>
      <Footer
        displayPosition='center'
        enableMenuCallBack={true}
        callbackHanlder={cleanUp}
      />
      <BlobEffect style='style-2' position='place-self-center opacity-50 ' />
    </div>
  );
}
