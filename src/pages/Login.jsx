import Button from "../components/button/Button";

export default function Login() {
  return (
    <div className='container mx-auto h-screen flex flex-col items-center justify-center'>
      <h1 className='font-title text-9xl mb-11'>Musical Mystery</h1>
      <h2 className='mt-10 text-2xl'>
        Login to your
        <span className='font-bold text-light-green'> Spotify </span>to start
        Playing
      </h2>
      <Button
        styles='mt-10 w-80'
        text='Login'
        callback={() => console.log("/play")}
      />
      <p className='mt-28 text-xs'>
        Note: Requries a
        <span className='font-bold text-light-green'> Spotify </span>Premium
        subscription to play
      </p>
    </div>
  );
}
