import { BlobEffect } from "../components/BlobEffects";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

export default function Instructions() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='container h-screen mx-auto pt-5 flex flex-col justify-around'
    >
      <div className='font-bold text-6xl'>How to Play 🎯</div>
      <ol className='leading-relaxed'>
        <li>
          1. Begin by clicking on the{" "}
          <span className='text-light-jade font-bold'> Play </span>icon in the
          game menu.
        </li>
        <li>2. Once loaded, the music will start playing.</li>
        <li>
          3. You now have a{" "}
          <span className='text-light-jade font-bold'> 20-second window </span>
          to make your song title guess.
        </li>
        <li>
          4. Successfully guessing the song title earns you{" "}
          <span className='text-light-jade font-bold'> 10 points </span>.
        </li>
        <li>
          5. You start with{" "}
          <span className='text-light-jade font-bold'> 3 life points </span>.
        </li>
        <li>
          6. Failing to guess within the timeframe results in a loss of{" "}
          <span className='text-red font-bold'> 1 life point </span>.
        </li>
        <li>
          7. After each guess attempt, regardless of correctness, the game
          proceeds to the next song.
        </li>
        <li>
          8. Aim to accumulate points and secure a spot on the leaderboard.
        </li>
      </ol>
      <div style={textStyle} className='text-3xl'>
        Do you have what it takes to earn a spot on the global leaderboard?
      </div>
      <Footer enableMenuCallBack={true} />
      <BlobEffect position='-top-96 -left-72' style='style-1' />
      <BlobEffect position='bottom-48 -right-96' style='style-2' />
    </motion.div>
  );
}

const textStyle = {
  background:
    "linear-gradient(270deg, #52B8FF 0%, #64C1EA 23.78%, #67C8D8 51%, #A1F5EB 80.24%, #B0D8F3 100%)",
  backgroundClip: "text,",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
