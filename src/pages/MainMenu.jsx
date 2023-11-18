import React, { useEffect, useState, Suspense } from "react";
import { useSpotifyContext } from "../context/SpotifyProvider";
import FallbackAvatarImg from "../assets/fallback-avatar.png";
import MenuNav from "../components/MenuNav";
import Footer from "../components/Footer";
import Header from "../components/Header";

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
      <Footer displayPosition={"start"} />
    </div>
  );
}
