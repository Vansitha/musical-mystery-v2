import { Link } from "react-router-dom";
import ToggleSwitch from "../components/ToggleSwitch";
import Footer from "../components/Footer";
import { BlobEffect } from "../components/BlobEffects";

const REPO_LINK = "https://github.com/Vansitha/musical-mystery-v2";

export default function Settings() {
  return (
    <div className='container h-screen mx-auto flex flex-col justify-evenly'>
      <div>
        <div className='font-bold text-6xl'>Settings ⚙</div>
        <div className='mt-5'>
          Customize settings and your privacy to your liking.
        </div>
      </div>
      <div>
        <div className='flex items-center'>
          <p className='pe-5'>Collect data for leaderboard </p>
          <ToggleSwitch />
        </div>
        <div className='flex items-center'>
          <p className='pe-5'>Collect data for leaderboard </p>
          <ToggleSwitch />
        </div>
        <div className='flex items-center'>
          <p className='pe-5'>Collect data for leaderboard </p>
          <ToggleSwitch />
        </div>
      </div>
      <div className='leading-relaxed'>
        <p className='font-semibold'>Musical Mystery v2.0</p>
        <p>Designed and built by as fun little side project.</p>
        <p>
          Want to contribute?{" "}
          <Link
            className='underline font-semibold'
            to={REPO_LINK}
            target='_blank'
          >
            {" "}
            Head to the repo on Github{" "}
          </Link>
        </p>
      </div>
      <Footer displayPosition='start' enableMenuCallBack={true} />
      <BlobEffect position='-bottom-80 -left-96' style='style-1' />
      <BlobEffect position='bottom-48 -right-96' style='style-2' />
    </div>
  );
}
