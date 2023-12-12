import Footer from "../components/Footer";
import { BlobEffect } from "../components/BlobEffects";
import { Link, useLocation } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { getHigestScore } from "../firebase/leaderboard";
import { useSpotifyContext } from "../context/SpotifyProvider";

export default function GameOver() {
  const { sdk } = useSpotifyContext();
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const location = useLocation();

  useEffect(() => {
    async function getScore() {
      const user = await sdk?.currentUser.profile();
      if (user) {
        const score = await getHigestScore(user.email);
        setHighScore(score);
      }
    }
    // Get the score from previous screen
    console.log(location);
    if (location.state) {
      setCurrentScore(location.state.score);
    }

    getScore();
  }, [sdk]);

  return (
    <div className='container h-screen flex flex-col justify-around mx-auto'>
      <div className='flex flex-col items-center'>
        <div className='font-bold text-7xl '>Game Over</div>
        <div className='my-10'>
          <div className='font-medium text-4xl mb-3'>
            Your Score: <span className='text-light-jade font-bold '>{currentScore}</span>
          </div>
          <div className='font-medium text-4xl'>
            High Score:{" "}
            <span className='text-light-jade font-bold'>{highScore}</span>
          </div>
        </div>
        <>
          <div className='text-center mt-16'>
            <div className='font-medium text-2xl'>
              See how you rank against other players
            </div>
            <Link
              to='/leaderboard'
              className='text-2xl mt-4 flex justify-center items-center'
            >
              <p>View Leaderboard</p>
              <ArrowRightIcon className='h-6 w-6 ms-2 inline-block' />
            </Link>
          </div>
        </>
      </div>
      <Footer displayPosition='center' enableMenuCallBack={true} />
      <BlobEffect position='bottom-60 -right-96' style='style-2' />
      <BlobEffect position='bottom-60 -left-96' style='style-2' />
    </div>
  );
}
