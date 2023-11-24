import { useEffect, useState } from "react";
import { useSpotifyContext } from "../context/SpotifyProvider";
import FallbackAvatarImg from "../assets/fallback-avatar.png";
import MenuNav from "../components/MenuNav";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { motion } from "framer-motion";

/**
 * Main menu component displaying user details, navigation menu, and footer.
 */
export default function MainMenu() {
  const { sdk } = useSpotifyContext();
  const [userDetails, setUserDetails] = useState({
    name: "User",
    profileImage: FallbackAvatarImg,
  });
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await sdk?.currentUser.profile();
        if (user) {
          setUserDetails({
            name: user?.display_name || "User",
            profileImage: user?.images[0]?.url || FallbackAvatarImg,
          });

          // Set 'play' to true if the user has a premium account
          if (user.product === "premium") {
            setPlay(true);
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    // Fetch user details when the SDK is available
    sdk && fetchUserDetails();
  }, [sdk]);

  return (
    <div className='container h-screen flex flex-col justify-around mx-auto'>
      <Header username={userDetails.name} image={userDetails.profileImage} />
      <MenuNav isPlay={play} />
      <Footer displayPosition={"start"} enableMenuCallBack={false} />
      <motion.div
        animate={{
          x: [0, 100, 0],
          rotate: [0, 350], // Rotate from 0 to 350 degrees (and continue)
          skewX: [-10, 0, -10], // SkewX from -10 to 0 and back
        }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }} // Adjust duration for a full rotation
        style={circle1Style}
        className='rounded-full bg-jade fixed -z-10 -top-64 -left-64'
      />
      <motion.div
        animate={{
          x: [0, 100, 0],
          rotate: [0, 350], // Rotate from 0 to 350 degrees (and continue)
          skewX: [-10, 0, -10], // SkewX from -10 to 0 and back
        }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }} // Adjust duration for a full rotation
        style={circle2Style}
        className='h-20 w-20 rounded-full bg-jade -z-10 fixed top-52 -right-96'
      />
    </div>
  );
}

const circle1Style = {
  background: "linear-gradient(180deg, #1ED79F 0%, #6495B7 100%)",
  filter: "blur(200.25px)",
  width: "41.125rem",
  height: "36.6875rem",
};

const circle2Style = {
  background: "linear-gradient(180deg, #27A7FF 0%, #FF3F3F 100%)",
  filter: "blur(120.849998474121094px)",
  width: "54.75rem",
  height: "57.625rem",
};
