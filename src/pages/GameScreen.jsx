import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import ToggleButton from "../components/ToggleButton";
import Footer from "../components/Footer";
import GameInfoPanel from "../components/GameInfoPanel";
import PlayBack from "../components/PlayBack";
import useSpotifyPlayer from "../hooks/useSpotifyPlayer";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const SCORE_INCREMENT_VALUE = 10;
const LIVES_DECREMENT_VALUE = 1;
const TWENTY_SECONDS = 20;

export default function GameScreen() {
  const { play, pause, getRandomTracks, isLoading } = useSpotifyPlayer();
  const navigate = useNavigate();

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

  const [countDown, setCountDown] = useState(0);
  const intervalId = useRef();

  useEffect(() => {
    if (startGame === false && !tracks.correctTrack.id) return;

    intervalId.current = setInterval(() => {
      setCountDown((prev) => prev - 1);

      if (countDown === 0) {
        clearInterval(intervalId);
        pickAndPlayTrack();
      }
    }, 1000);

    // Clear the interval when the game is paused
    return () => clearInterval(intervalId.current);
  }, [startGame, tracks]);

  // Step 1
  function pickAndPlayTrack() {
    const randomTracks = getRandomTracks();
    const correctTrack = randomTracks[Math.floor(Math.random() * 3)];
    setTracks({
      correctTrack,
      allTracks: randomTracks,
    });
    play(correctTrack.id);
    setCountDown(TWENTY_SECONDS);
  }

  // Step 2
  function playInitialSongHanlder() {
    setStartGame((prev) => !prev);
    pickAndPlayTrack();
  }

  // Step 3 - User clicks on button
  function answerBtnClickHandler(btnText) {
    console.log(btnText, tracks.correctTrack.name);
    if (tracks.correctTrack.name === btnText) {
      setScore((prev) => prev + SCORE_INCREMENT_VALUE);
    } else {
      const newLives = lives - LIVES_DECREMENT_VALUE;
      if (newLives == 0) {
        toast("Game Over! No lives left.", { icon: "👻" });
        pause();
        clearInterval(intervalId.current);
        setLives(newLives);
        setInterval(() => {
          navigate("/game-over", { replace: true, state: { score } });
        }, 4000);
        return;
      }
      setLives(newLives);
    }
    pickAndPlayTrack();
  }

  return (
    <div className='h-screen container mx-auto px-24 flex flex-col justify-around'>
      <Toaster position='top-center' reverseOrder={true} />
      <GameInfoPanel score={score} lives={lives} />
      <PlayBack totalTime={TWENTY_SECONDS} countdown={countDown} />
      <section className='flex justify-evenly pt-10'>
        {!startGame ? (
          <Button
            text={isLoading ? "Loading..." : "Play Music!"}
            callback={playInitialSongHanlder}
          />
        ) : (
          <>
            {tracks.allTracks.map((track) => {
              return (
                <ToggleButton
                  key={track.id}
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
        callbackHanlder={pause}
      />
    </div>
  );
}
