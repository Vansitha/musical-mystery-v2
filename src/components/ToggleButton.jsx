export default function ToggleButton({ text, state, callback }) {
  return (
    <button
      className={`p-3 px-24 rounded-xl ${
        state
          ? "bg-light-green text-white"
          : "bg-white text-black hover:bg-light-green hover:text-white"
      }`}
      onClick={() => {
        callback(text);
      }}
    >
      <span className='font-bold text-xl'>{text}</span>
    </button>
  );
}
