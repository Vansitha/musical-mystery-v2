import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlobEffect } from "../components/BlobEffects";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Button from "../components/Button";
import AnswerButton from "../components/game-screen/AnswerButton";
import Footer from "../components/Footer";
import GameInfoPanel from "../components/game-screen/GameInfoPanel";
import PlayBack from "../components/game-screen/PlayBack";
import useSpotifyPlayer from "../hooks/useSpotifyPlayer";
import LoadingStage from "../components/game-screen/LoadingStage";

const SCORE_INCREMENT_VALUE = 100;
const LIVES_DECREMENT_VALUE = 1;
const TIMER_START_VALUE = 20;

function generateGameId() {
  return Math.floor(Math.random() * 1000000).toString();
}

export default function GameScreen() {
  const navigate = useNavigate();
  const countdownIntervalId = useRef();
  const gameOverTimeoutId = useRef();
  const [countDown, setCountDown] = useState(0);
  const [isPlayGame, setIsPlayGame] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [currRoundTracks, setTracks] = useState({
    correctTrack: {
      id: "",
      name: "",
    },
    selectedTracks: [],
  });
  const {
    play,
    pause,
    getRandomTracks,
    getProgress,
    resetPlayerProgress,
    isLoading,
  } = useSpotifyPlayer();

  // Updates countdown timer value
  useEffect(() => {
    if (isPlayGame === false && !currRoundTracks.correctTrack.id) return;

    resetPlayerProgress();

    countdownIntervalId.current = setInterval(() => {
      (async () => {
        const seconds = await getProgress();
        setCountDown(TIMER_START_VALUE - Math.ceil(seconds));
      })();
    }, 1000);

    // Clear the interval when the game is paused
    return () => clearInterval(countdownIntervalId.current);
  }, [isPlayGame, currRoundTracks]);

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
    const trackCount = 3;
    const randomTracks = getRandomTracks(trackCount);
    const correctTrack = randomTracks[Math.floor(Math.random() * trackCount)];
    setTracks({
      correctTrack,
      selectedTracks: randomTracks,
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
    if (currRoundTracks.correctTrack.name === btnText) {
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
    if (newLives != 0) return false;

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='h-screen container mx-auto px-24 flex flex-col justify-around'
    >
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
            {currRoundTracks.selectedTracks.map((track) => {
              return (
                <AnswerButton
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
    </motion.div>
  );
}
