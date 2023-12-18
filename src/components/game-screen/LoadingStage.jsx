import { BlobEffect } from "../BlobEffects";
import Spinner from "../Spinner";
import Footer from "../Footer";

export default function LoadingStage() {
  return (
    <>
      <div className='h-screen container mx-auto px-24 flex flex-col justify-center items-center'>
        <div className='mb-10 opacity-70'>
          💡 Suggestion: Consider wearing heaphones in public a setting.
        </div>
        <div className='mb-10 text-3xl font-bold'>Preparing Music Player</div>
        <Spinner size='lg' />
        <Footer
          displayPosition='center'
          className='absolute bottom-0 my-10'
          enableMenuCallBack={true}
        />
      </div>
      <BlobEffect style='style-2' position='top-0 -left-96 opacity-70' />
      <BlobEffect style='style-1' position='bottom-96 right-0' />
    </>
  );
}
