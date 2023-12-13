import Table from "../components/Table";
import Footer from "../components/Footer";
import { BlobEffect } from "../components/BlobEffects";
import { useEffect } from "react";
import { getTopTenLeaderboard } from "../firebase/leaderboard";
import { useState } from "react";

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    async function getLeaderboardData() {
      const players = await getTopTenLeaderboard();
      setLeaderboardData(players);
    }
    getLeaderboardData();
  }, []);

  return (
    <div className='container mx-auto flex flex-col justify-around mt-5'>
      <div>
        <div className='font-extrabold text-6xl pt-5'>Leaderboard 🏆</div>
        <p className='py-3 mb-5'>
          See where you stand in the global standings.
        </p>
      </div>
      <Table data={leaderboardData} />
      <Footer
        className='absolute bottom-0 mt-20 mb-5 pb-3'
        enableMenuCallBack={true}
      />
      <BlobEffect position='-top-64 -left-64' style='style-1' />
      <BlobEffect position='top-52 -right-96' style='style-2' />
    </div>
  );
}
