import { useEffect, useState } from "react";
import { useSpotifyContext } from "../context/SpotifyProvider";
import { BlobEffect } from "../components/BlobEffects";
import { createUser } from "../firebase/leaderboard";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import FallbackAvatarImg from "../assets/fallback-avatar.png";
import MenuNav from "../components/MenuNav";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";

export default function MainMenu() {
  const { sdk } = useSpotifyContext();
  const [userDetails, setUserDetails] = useState({
    name: "",
    profileImage: FallbackAvatarImg,
  });
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [showPreimumRequiredModal, showPremiumRequiredModal] = useState(false);

  useEffect(() => {
    if (!sdk) return;

    const getUserDetials = async () => {
      try {
        const user = await sdk?.currentUser.profile();

        if (user) {
          setUserDetails({
            name: user?.display_name,
            profileImage: user?.images[0]?.url || FallbackAvatarImg,
          });
          await createUser(user.email, user.display_name, user.country);

          /* IMPORTANT: Only premium users can play, since spotify requires 
             it for audio playback when building an app */
          if (user.product === "premium") {
            setReadyToPlay(true);
            return;
          }
          showPremiumRequiredModal(true);
        }
      } catch (error) {
        toast.error("Unable to verify preimum status.");
      }
    };

    getUserDetials();
  }, [sdk]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='container h-screen flex flex-col justify-around mx-auto'
    >
      {showPreimumRequiredModal && (
        <Modal
          heading='Spotify Preimum Required'
          body='Upgrade or log in with another account to keep the good vibes rollin!'
          btnText='Okay, Got it!'
          btnHoverColor='jade'
        />
      )}
      <Header username={userDetails.name} image={userDetails.profileImage} />
      <MenuNav isPlay={readyToPlay} />
      <Footer displayPosition={"start"} enableMenuCallBack={false} />
      <BlobEffect position='-top-64 -left-64' style='style-1' />
      <BlobEffect position='top-52 -right-96' style='style-2' />
      <Toaster />
    </motion.div>
  );
}
