export default function Button({ text, callback, styles }) {
  return (
    <button
      className={`p-3 px-24 bg-light-green rounded-xl hover:bg-dark-green ${styles}`}
      onClick={callback}
    >
      <span className='text-white font-bold text-xl'>{text}</span>
    </button>
  );
}
