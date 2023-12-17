import Footer from "../components/Footer";
import { BlobEffect } from "../components/BlobEffects";
import { motion } from "framer-motion";

export default function ErrorPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='h-screen container mx-auto flex flex-col justify-between py-16'
    >
      <div className='font-extrabold'>
        <div className='text-jade text-9xl'>404</div>
        <div className='text-8xl pt-3'>Uhh, are you lost?</div>
      </div>
      <Footer displayPosition='start' enableMenuCallBack={true} />
      <BlobEffect position='bottom-60 -right-96' style='style-1' />
    </motion.div>
  );
}
