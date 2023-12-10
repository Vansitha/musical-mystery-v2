import { useEffect, useState } from "react";
import { useSpotifyContext } from "../context/SpotifyProvider";
import FallbackAvatarImg from "../assets/fallback-avatar.png";
import MenuNav from "../components/MenuNav";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { BlobEffect } from "../components/BlobEffects";
import { createUser } from "../firebase/leaderboard";

/**
 * Main menu component displaying user details, navigation menu, and footer.
 */
export default function MainMenu() {
  const { sdk } = useSpotifyContext();
  const [userDetails, setUserDetails] = useState({
    name: "",
    profileImage: FallbackAvatarImg,
  });
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await sdk?.currentUser.profile();
        if (user) {
          setUserDetails({
            name: user?.display_name,
            profileImage: user?.images[0]?.url || FallbackAvatarImg,
          });
          await createUser(user.email, user.display_name, user.country);

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
      <BlobEffect position='-top-64 -left-64' style='style-1' />
      <BlobEffect position='top-52 -right-96' style='style-2' />
    </div>
  );
}
