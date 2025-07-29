import ErrorBoundary from '../components/ErrorBoundary';
import type { CharacterData } from '../models/interfaces';
import CharacterCard from '../components/CharacterCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import { Outlet } from 'react-router-dom';

interface HomePageProps {
  isLoading: boolean;
  isClichedErrorButton: boolean;
  characters: CharacterData[];
  errorMessage: string;
  throwError: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pages: number;
}

export default function HomePage({
  isLoading,
  isClichedErrorButton,
  characters,
  errorMessage,
  throwError,
  pages,
  currentPage,
  setCurrentPage,
}: HomePageProps) {
  return (
    <div className="m-auto px-0 py-4 justify-between align-top">
      <ErrorBoundary isClichedErrorButton={isClichedErrorButton}>
        <div className="m-auto mt-4 flex justify-between items-center">
          <button
            className="bg-green-500 hover:bg-green-600 hover:text-white p-2 duration-300  py-2 px-4 text-black"
            onClick={throwError}
          >
            ErrorBoundary
          </button>
          {pages > 0 && (
            <Pagination
              currentPage={currentPage}
              pages={pages}
              prevPage={currentPage > 1}
              nextPage={currentPage < pages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>

        {errorMessage ? (
          <div className="text-red-500 text-center pt-4">
            <span>{errorMessage}</span>
          </div>
        ) : (
          <>
            {isLoading && <Loader />}
            <div className="flex gap-6">
              <div className="flex flex-wrap justify-center gap-6 py-4 grow">
                {characters.map((character) => (
                  <CharacterCard key={character.id} character={character} />
                ))}
              </div>
              <div>
                <Outlet />
              </div>
            </div>
          </>
        )}
      </ErrorBoundary>
    </div>
  );
}
