import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlobEffect } from "../components/BlobEffects";
import toast, { Toaster } from "react-hot-toast";
import Button from "../components/Button";
import ToggleButton from "../components/ToggleButton";
import Footer from "../components/Footer";
import GameInfoPanel from "../components/GameInfoPanel";
import PlayBack from "../components/PlayBack";
import useSpotifyPlayer from "../hooks/useSpotifyPlayer";
import LoadingStage from "../components/LoadingStage";

const SCORE_INCREMENT_VALUE = 100;
const LIVES_DECREMENT_VALUE = 1;
const TIMER_START_VALUE = 20;

function generateGameId() {
  return Math.floor(Math.random() * 1000000).toString();
}

export default function GameScreen() {
  const { play, pause, getRandomTracks, getProgress, reset, isLoading } =
    useSpotifyPlayer();
  const navigate = useNavigate();
  const countdownIntervalId = useRef();
  const gameOverTimeoutId = useRef();
  const [countDown, setCountDown] = useState(0);
  const [isPlayGame, setIsPlayGame] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [tracks, setTracks] = useState({
    correctTrack: {
      id: "",
      name: "",
    },
    allTracks: [],
  });

  // Updates countdown timer value
  useEffect(() => {
    if (isPlayGame === false && !tracks.correctTrack.id) return;

    reset();

    countdownIntervalId.current = setInterval(() => {
      (async () => {
        const seconds = await getProgress();
        setCountDown(TIMER_START_VALUE - Math.ceil(seconds));
      })();
    }, 1000);

    // Clear the interval when the game is paused
    return () => clearInterval(countdownIntervalId.current);
  }, [isPlayGame, tracks]);

  // Checks if game over and plays new song when countdown timer reaches 0
  useEffect(() => {
    if (!countdownIntervalId.current) return;

    if (countDown <= 0) {
      const newLives = lives - LIVES_DECREMENT_VALUE;
      const isOver = isGameOver(newLives);
      if (isOver) return;
      setLives(newLives);
      pickAndPlayTrack();
      clearInterval(countdownIntervalId.current);
    }
  }, [countDown]);

  // Step 1
  function pickAndPlayTrack() {
    const randomTracks = getRandomTracks();
    const correctTrack = randomTracks[Math.floor(Math.random() * 3)];
    setTracks({
      correctTrack,
      allTracks: randomTracks,
    });
    play(correctTrack.id);
  }

  // Trigger start of game
  function playInitialSongHanlder() {
    setIsPlayGame((prev) => !prev);
    pickAndPlayTrack();
  }

  // User clicks on the answer button
  function answerBtnClickHandler(btnText) {
    clearInterval(countdownIntervalId.current);
    setCountDown(TIMER_START_VALUE);
    if (tracks.correctTrack.name === btnText) {
      setScore((prev) => prev + SCORE_INCREMENT_VALUE);
    } else {
      const newLives = lives - LIVES_DECREMENT_VALUE;
      setLives(newLives);
      const isOver = isGameOver(newLives);
      if (isOver) return;
    }
    pickAndPlayTrack();
  }

  // Check if game over
  function isGameOver(newLives) {
    if (newLives == 0) {
      toast("Game over! You have no lives left.", { icon: "💔" });
      setDisableButtons(true);
      pause();
      clearInterval(countdownIntervalId.current);
      setLives(newLives);

      gameOverTimeoutId.current = setTimeout(() => {
        navigate("/game-over", {
          replace: true,
          state: { score, currGameId: generateGameId() },
        });
      }, 2000);

      return true;
    }
    return false;
  }

  // Cleaning up the intervals, timeouts and pausing music before leaving the page
  function cleanUp() {
    pause();
    clearInterval(countdownIntervalId.current);
    clearTimeout(gameOverTimeoutId.current);
  }

  if (isLoading) {
    return <LoadingStage />;
  }

  return (
    <div className='h-screen container mx-auto px-24 flex flex-col justify-around'>
      <Toaster position='top-center' reverseOrder={true} />
      <GameInfoPanel score={score} lives={lives} />
      <PlayBack totalTime={TIMER_START_VALUE} countdown={countDown} />
      <section className='flex justify-evenly pt-10'>
        {!isPlayGame ? (
          <Button
            isDisabled={isLoading}
            text='Play Music!'
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
                  isDisabled={disableButtons}
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
      <BlobEffect style='style-2' position='top-0 -right-96 opacity-50' />
      <BlobEffect style='style-1' position='top-0 -left-96 opactiy-50' />
    </div>
  );
}