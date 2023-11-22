import ToggleButton from "../components/ToggleButton";
import Footer from "../components/Footer";
import GameInfoPanel from "../components/GameInfoPanel";
import PlayBack from "../components/PlayBack";
import usePlayer from "../hooks/usePlayer";

export default function GameScreen() {
  usePlayer();
  const isLoading = false;
  return (
    <div className='h-screen container mx-auto px-24 flex flex-col justify-around'>
      <GameInfoPanel score={10} lives={3} />
      <PlayBack completed={80} countdown={20} />
      <section className='flex justify-evenly pt-10'>
        <ToggleButton text={"Something"} isLoading={isLoading} />
        <ToggleButton text={"Something"} isLoading={isLoading} />
        <ToggleButton text={"Something"} isLoading={isLoading} />
      </section>
      <Footer displayPosition='center' enableMenuCallBack={true} />
    </div>
  );
}
