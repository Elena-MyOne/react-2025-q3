import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_PATHS } from '../routes';

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="w-full my-5 text-center bg-gray-100">
      <div className="">Details {id}</div>
      <button
        className="text-center cursor-pointer text-black duration-300 border-[1px] border border-transparent bg-green-400 hover:bg-green-500 p-2 my-4"
        onClick={() => navigate(`${ROUTE_PATHS.HOME}`)}
      >
        Close details
      </button>
    </div>
  );
}
