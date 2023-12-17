import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  getHigestScore,
  updateUserHighScore,
  getPrevGameId,
} from "../firebase/leaderboard";
import { BlobEffect } from "../components/BlobEffects";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useSpotifyContext } from "../context/SpotifyProvider";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

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

    async function updateScore() {
      const user = await sdk?.currentUser.profile();
      // Get the score from previous screen
      if (location.state) {
        const { score, currGameId } = location.state;
        setCurrentScore(score);
        if (user) {
          const prevGameId = await getPrevGameId(user.email);
          if (currGameId == prevGameId) return;
          await updateUserHighScore(user.email, score, currGameId);
        }
      }
    }

    getScore();
    updateScore();
  }, [sdk, highScore, location.state]);

  const varient = {
    varientA: { x: 0 },
    varientB: { x: 7 },
  };

  return (
    <div className='container h-screen flex flex-col justify-around mx-auto'>
      <div className='flex flex-col items-center'>
        <div className='font-extrabold text-8xl '>Game Over</div>
        <div className='my-16 text-center'>
          {currentScore >= highScore ? (
            <>
              <div className='font-bold text-5xl'>
                New High Score:&nbsp;
                <span className='text-light-jade'>{highScore}</span>
              </div>
            </>
          ) : (
            <>
              <div className='font-bold text-3xl mb-3'>
                High Score:&nbsp;
                <span className='text-light-jade'>{highScore}</span>
              </div>
              <div className='font-bold text-5xl'>
                Your Score:&nbsp;
                <span className='text-light-jade'>{currentScore}</span>
              </div>
            </>
          )}
        </div>
        <div className='text-center mt-16'>
          <div className='text-xl'>
            Discover where you stand among other players
          </div>
          <Link
            to='/leaderboard'
            className='text-xl mt-4 flex justify-center items-center'
          >
            <motion.div
              className='flex'
              variants={varient.varientA}
              initial='varientA'
              whileHover='varientB'
            >
              <p className=''>View Leaderboard</p>
              <motion.div variants={varient}>
                <ArrowRightIcon className='h-5 w-5 ms-1 inline-block' />
              </motion.div>
            </motion.div>
          </Link>
        </div>
      </div>
      <Footer displayPosition='center' enableMenuCallBack={true} />
      <BlobEffect position='bottom-60 -right-96' style='style-2' />
      <BlobEffect position='bottom-60 -left-96' style='style-2' />
    </div>
  );
}
