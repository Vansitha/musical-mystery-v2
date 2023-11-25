import Table from "../components/Table";
import Footer from "../components/Footer";
import { BlobEffect } from "../components/BlobEffects";

export default function Leaderboard() {
  return (
    <div className='container mx-auto flex flex-col justify-between'>
      <div>
        <div className='font-extrabold text-6xl pt-5'>Leaderboard 🏆</div>
        <p className='py-3 mb-5'>
          See where you stand in the global standings.
        </p>
      </div>
      <Table />
      <Footer className='mt-5 pb-3' enableMenuCallBack={true} />
      <BlobEffect position='-top-64 -left-64' style='style-1' />
      <BlobEffect position='top-52 -right-96' style='style-2' />
    </div>
  );
}
