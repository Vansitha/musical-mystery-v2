import React, { useState } from "react";
import ToggleButton from "../components/ToggleButton";
import Footer from "../components/Footer";
import GameInfoPanel from "../components/GameInfoPanel";
import PlayBack from "../components/PlayBack";

export default function GameScreen() {
  return (
    <div className='h-screen container mx-auto px-24 flex flex-col justify-around'>
      <GameInfoPanel score={10} lives={3} />
      <PlayBack completed={80} countdown={20} />
      <section className='flex justify-evenly pt-10'>
        <ToggleButton state={false} text='Song Title 1' />
        <ToggleButton state={false} text='Song Title 2' />
        <ToggleButton state={false} text='Song Title 3' />
      </section>
      <Footer displayPosition='center' enableMenuCallBack={true} />
    </div>
  );
}
