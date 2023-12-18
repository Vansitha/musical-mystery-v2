import { BlobEffect } from "../components/BlobEffects";
import { useEffect } from "react";
import { getTopTenLeaderboard } from "../firebase/leaderboard";
import { useState } from "react";
import { useSpotifyContext } from "../context/SpotifyProvider";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import LeaderboardTable from "../components/leaderboard/LeaderboardTable";
import Footer from "../components/Footer";

export default function Leaderboard() {
  const [topPlayersRankDetails, setTopPlayersRankDetails] = useState([]);
  const [userRank, setUserRank] = useState("Unrated");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { sdk } = useSpotifyContext();

  useEffect(() => {
    async function getLeaderboardData() {
      try {
        const players = await getTopTenLeaderboard();
        setTopPlayersRankDetails(players);

        const user = await sdk?.currentUser.profile();
        const player = players.find((player) => player.email == user?.email);
        player && setUserRank("# " + player.rank);
      } catch (error) {
        toast.error("Oops! An error occurred.");
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getLeaderboardData();
  }, [sdk]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='container mx-auto flex flex-col justify-around mt-5'
    >
      <div className='flex justify-between'>
        <div>
          <div className='font-extrabold text-6xl pt-5'>Leaderboard 🏆</div>
          <p className='py-3 mb-5'>
            See where you stand in the global standings.
          </p>
        </div>
        <p className='text-center my-auto text-silver'>
          Your Rank
          <span className='text-4xl ms-5 font-bold'>{userRank}</span>
        </p>
      </div>
      <LeaderboardTable
        data={topPlayersRankDetails}
        isLoading={isLoading}
        isError={isError}
      />
      <Footer
        className='absolute bottom-0 mt-20 mb-5 pb-3'
        enableMenuCallBack={true}
      />
      <BlobEffect position='-top-64 -left-64' style='style-1' />
      <BlobEffect position='top-52 -right-96' style='style-2' />
      <Toaster />
    </motion.div>
  );
}
