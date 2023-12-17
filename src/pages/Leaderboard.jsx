import { BlobEffect } from "../components/BlobEffects";
import { useEffect } from "react";
import { getTopTenLeaderboard } from "../firebase/leaderboard";
import { useState } from "react";
import { useSpotifyContext } from "../context/SpotifyProvider";
import Table from "../components/Table";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [playerRank, setPlayerRank] = useState("Unrated");
  const [isLoading, setIsLoading] = useState(true);
  const { sdk } = useSpotifyContext();

  useEffect(() => {
    async function getLeaderboardData() {
      const players = await getTopTenLeaderboard();
      setLeaderboardData(players);

      const user = await sdk?.currentUser.profile();
      const player = players.find((player) => player.email == user?.email);
      player && setPlayerRank("# " + player.rank);
      setIsLoading(false);
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
          <span className='text-4xl ms-5 font-bold'>{playerRank}</span>
        </p>
      </div>
      <Table data={leaderboardData} isLoading={isLoading} />
      <Footer
        className='absolute bottom-0 mt-20 mb-5 pb-3'
        enableMenuCallBack={true}
      />
      <BlobEffect position='-top-64 -left-64' style='style-1' />
      <BlobEffect position='top-52 -right-96' style='style-2' />
    </motion.div>
  );
}
