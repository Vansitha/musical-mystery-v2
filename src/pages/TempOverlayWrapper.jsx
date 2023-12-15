import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { BlobEffect } from "../components/BlobEffects";
import Footer from "../components/Footer";

export default function TempOverlayWrapper() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1290);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <>{isSmallScreen ? <Overlay /> : <Outlet />}</>;
}

function Overlay() {
  return (
    <div className='container mx-auto text-center flex flex-col h-screen justify-center items-center font-body text-white'>
      <p className='text-sm mb-2'>Musical Mystery</p>
      <h1 className='mb-14 font-bold text-4xl leading-normal'>
        Available Soon!
      </h1>
      <p className='mx-5 sm:w-[490px] md:w-[490px] font-medium text-sm'>
        We&apos;re currently optimizing the game for mobile and tablet devices,
        it&apos;ll be available on your device soon!
      </p>
      <p className='text-4xl'></p>
      <BlobEffect position='top-0 left-1/2' style='style-1' />
      <div className='absolute bottom-0 mb-10'>
        <Footer />
      </div>
    </div>
  );
}
