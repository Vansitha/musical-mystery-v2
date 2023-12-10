import Footer from "../components/Footer";
import { BlobEffect } from "../components/BlobEffects";

export default function ErrorPage() {
  return (
    <div className='h-screen container mx-auto flex flex-col justify-between py-16'>
      <div className='font-extrabold'>
        <div className='text-jade text-9xl'>404</div>
        <div className='text-8xl pt-3'>Uhh, are you lost?</div>
      </div>
      <Footer displayPosition='start' enableMenuCallBack={true} />
      <BlobEffect position='bottom-60 -right-96' style='style-1' />
    </div>
  );
}
