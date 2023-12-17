import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BlobEffect } from "../components/BlobEffects";
import { useSpotifyContext } from "../context/SpotifyProvider";
import toast, { Toaster } from "react-hot-toast";
import ToggleSwitch from "../components/ToggleSwitch";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import {
  deleteUserAccount,
  getAnonymousMode,
  toggleAnonymousMode,
} from "../firebase/leaderboard";
import { motion } from "framer-motion";

const REPO_LINK = "https://github.com/Vansitha/musical-mystery-v2";
const DELETE_HEADING_TXT = "Leaving Already? 😥";
const DELETE_BTN_TXT = "Yes Proceed";
const DELETE_BODY_TXT =
  "This action will permanently delete your game data and will be logged out of the app. Don't worry, this will not delete your spotify account!  Are you sure you want to proceed?";

export default function Settings() {
  const [showModal, setShowModal] = useState(false);
  const [hideName, setHideName] = useState(false);
  const { sdk } = useSpotifyContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserSettings() {
      const user = await sdk?.currentUser.profile();
      const state = await getAnonymousMode(user?.email);
      setHideName(state);
    }

    getUserSettings();
  }, [sdk]);

  async function deleteAccount() {
    const user = await sdk?.currentUser.profile();
    const success = await deleteUserAccount(user?.email);

    if (success) {
      localStorage.clear();
      navigate("/", { replace: true });
    } else {
      toast.error("Could not delete account");
    }
  }

  async function hideNameToggle() {
    const user = await sdk?.currentUser.profile();
    const isSuccess = await toggleAnonymousMode(user?.email, !hideName);
    return isSuccess;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='container h-screen mx-auto flex flex-col justify-evenly'
    >
      <Toaster />
      {showModal && (
        <Modal
          heading={DELETE_HEADING_TXT}
          body={DELETE_BODY_TXT}
          btnText={DELETE_BTN_TXT}
          btnHandler={deleteAccount}
          btnHoverColor='red'
        />
      )}
      <div>
        <div className='font-bold text-6xl'>Settings ⚙</div>
        <div className='mt-5'>
          Customize settings and your privacy to your liking.
        </div>
      </div>
      <div>
        <div className='flex items-center mb-2'>
          <p className='pe-5'>Hide my name on leaderboard</p>
          <ToggleSwitch state={hideName} toggleHandler={hideNameToggle} />
        </div>
        <Link
          onClick={() => setShowModal(!showModal)}
          className='underline underline-offset-2 hover:text-red'
        >
          Delete my data
        </Link>
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
    </motion.div>
  );
}
