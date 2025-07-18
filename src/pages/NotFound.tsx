import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <section className="flex justify-center items-center flex-col gap-4 h-[60vh]">
      <h1 className="text-8xl font-bold">404</h1>
      <h2 className="text-center text-3xl font-bold">
        Oh, man. Page not found
      </h2>
      <div className="flex justify-end my-4">
        <button
          className="bg-green-500 hover:bg-green-600 hover:text-white py-2 px-4 duration-300"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
      </div>
    </section>
  );
}
