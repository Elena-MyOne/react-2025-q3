import ErrorBoundary from '../components/ErrorBoundary';
import type { CharacterData } from '../models/interfaces';
import CharacterCard from '../components/CharacterCard';

interface HomePageProps {
  isLoading: boolean;
  isClichedErrorButton: boolean;
  characters: CharacterData[];
  errorMessage: string;
  throwError: () => void;
}

export default function HomePage({
  isLoading,
  isClichedErrorButton,
  characters,
  errorMessage,
  throwError,
}: HomePageProps) {
  return (
    <div className="m-auto px-0 py-4 justify-between align-top">
      <ErrorBoundary isClichedErrorButton={isClichedErrorButton}>
        <div className="m-auto w-full mt-4">
          <button
            className="bg-green-500 hover:bg-green-600 hover:text-white p-2 duration-300 w-full py-2 px-4 duration-300"
            onClick={throwError}
          >
            ErrorBoundary
          </button>
        </div>
        {errorMessage ? (
          <div className="text-red-500 text-center pt-4">
            <span>{errorMessage}</span>
          </div>
        ) : (
          <>
            <div className="flex justify-end my-4"></div>
            {isLoading && (
              <div className="text-center">
                <span className="text-primary">Loading ...</span>
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-6 py-4">
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          </>
        )}
      </ErrorBoundary>
    </div>
  );
}
