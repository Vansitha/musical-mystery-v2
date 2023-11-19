import React, { useState } from "react";

export default function ToggleButton({ text, state, callback }) {
  return (
    <button
      className={`p-3 px-24 rounded-xl ${
        state
          ? "bg-light-green text-white"
          : "bg-white text-black hover:bg-light-green hover:text-white"
      }`}
      onClick={callback}
    >
      <span className='font-extrabold text-xl'>{text}</span>
    </button>
  );
}
