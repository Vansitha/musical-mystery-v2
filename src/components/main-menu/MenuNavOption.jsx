import { useNavigate } from "react-router-dom";

export default function MenuNavOption({ option, routePath }) {
  const navigate = useNavigate();
  return (
    <div className='font-bold text-6xl mb-5 w-fit'>
      <span
        onClick={() => navigate(routePath)}
        className="'font-bold text-6xl cursor-pointer mb-5 relative after:bg-light-green after:absolute after:h-1 after:w-0 after:bottom-2 after:left-0 hover:after:w-full after:transition-all after:duration-300 '"
      >
        {option}
      </span>
    </div>
  );
}
