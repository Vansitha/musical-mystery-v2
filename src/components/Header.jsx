import { useNavigate } from "react-router-dom";

export default function Header({ username, image }) {
  const navigate = useNavigate();

  return (
    <header className='flex justify-between items-center'>
      <div className='flex'>
        <h2
          className='me-2 font-semibold hover:cursor-pointer'
          onClick={() => navigate("/main-menu")}
        >
          Musical Mystery
        </h2>
      </div>
      <div className='flex items-center'>
        <p>Hi {username}!</p>
        <img
          className='h-10 w-10 rounded-full ms-4 object-cover object-center'
          src={image}
          alt='User spotify profile image'
        />
      </div>
    </header>
  );
}
