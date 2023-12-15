import { HeartIcon } from "@heroicons/react/24/solid";

export default function GameInfoPanel({ score, lives }) {
  return (
    <section className='flex justify-between'>
      <div className='text-4xl font-extrabold'>
        Score: <span className='text-5xl'>{score}</span>
      </div>
      <div className='flex text-5xl font-extrabold'>
        <HeartIcon className='h-10 w-10 text-red me-3' />
        <span>{lives}</span>
      </div>
    </section>
  );
}
