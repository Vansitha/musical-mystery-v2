export default function PlayBack({ countdown, totalTime }) {
  function secondsToPercentage(seconds) {
    const percentage = ((totalTime - seconds) / totalTime) * 100;
    return Math.max(0, Math.min(100, percentage));
  }

  const completed = secondsToPercentage(countdown);
  const barColor = completed >= 80 ? "bg-red" : "bg-light-green";

  return (
    <section className='flex flex-col items-center justify-center'>
      <div className='font-extrabold text-8xl pb-10'>{countdown}</div>
      <div className='w-10/12 full h-6 bg-gray-200 rounded-full bg-white relative'>
        <div
          className={`h-6 rounded-full ${barColor}`}
          style={{
            width: `${completed}%`,
            transition: "width 1s ease",
          }}
        />
      </div>
    </section>
  );
}
