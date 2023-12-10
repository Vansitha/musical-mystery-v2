import Footer from "../components/Footer";
import { BlobEffect } from "../components/BlobEffects";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function GameOver() {
  // TODO: Get highest score from the database
  // TODO: Show the leaderboard also

  return (
    <div className='container h-screen flex flex-col justify-around mx-auto'>
      <div className='flex flex-col items-center'>
        <div className='font-bold text-7xl '>Game Over</div>
        <div className='my-10'>
          <div className='font-medium text-4xl mb-3'>
            Your Score: <span className='text-light-jade font-bold '>100</span>
          </div>
          <div className='font-medium text-4xl'>
            High Score: <span className='text-light-jade font-bold'>800</span>
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
