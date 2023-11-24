import { useLocation } from "react-router-dom";
import Table from "../components/Table";
import Footer from "../components/Footer";

export default function GameOver() {
  // TODO: Get highest score from the database
  // TODO: Show the leaderboard also
  const location = useLocation();

  return (
    <div className='container h-screen flex flex-col justify-around mx-auto'>
      <div className='flex flex-col items-center'>
        <div className='font-extrabold '>Game Over</div>
        <div className='font-medium'>Your Score: 0</div>
        <div className='font-medium'>Highest Score: 0</div>

        <div className='font-medium'>
          See how you rank with others in the world
        </div>
      </div>
      <Table className='my-20' />
      <Footer displayPosition='center' enableMenuCallBack={true} />
    </div>
  );
}
