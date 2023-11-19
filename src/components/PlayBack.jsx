import React from "react";

export default function PlayBack({ completed, countdown }) {
  const barColor = completed >= 80 ? "bg-red" : "bg-light-green";

  return (
    <section className='flex flex-col items-center justify-center'>
      <div className='font-extrabold text-7xl pb-10'>{countdown}</div>
      <div className='w-10/12 full h-6 bg-gray-200 rounded-full bg-white'>
        <div
          className={`h-6 rounded-full ${barColor}`}
          style={{ width: `${completed}%` }}
        />
      </div>
    </section>
  );
}
