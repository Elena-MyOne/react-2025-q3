import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { getThemeBackgroundClass } from '../helpers/getThemeBackgroundClass';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  return (
    <section className="flex justify-center items-center flex-col gap-4 h-[60vh]">
      <div className={`${getThemeBackgroundClass(theme)} p-22 text-center`}>
        <h1 className="text-8xl font-bold">404</h1>
        <h2 className="text-center text-3xl font-bold ">
          Oh, man. Page not found
        </h2>
        <div className="flex justify-end my-4"></div>
        <button
          className="bg-green-500 hover:bg-green-600 hover:text-white py-2 px-4 duration-300 text-black"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
      </div>
    </section>
  );
}
