import { useCallback, useEffect, useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { BASE_URL, LOCAL_STORAGE_VALUE } from './consts';
import type { CharactersData, CharacterData } from './models/interfaces';
import CharacterCard from './components/CharacterCard';
import Header from './components/Header';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isClichedErrorButton, setIsClichedErrorButton] = useState(false);
  const [, setError] = useState<Error | null>(null);
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const throwError = () => {
    setIsClichedErrorButton(true);
    console.error('Error: The Error boundary button was triggered');
  };

  const getSearchQuery = useCallback(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_VALUE) || '';
    setSearchQuery(stored);
    return stored;
  }, []);

  const getCharacters = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(BASE_URL);
      const data: CharactersData = await response.json();
      setCharacters(data.results);
      setError(null);
      setErrorMessage('');
    } catch (err) {
      setCharacters([]);
      setError(err as Error);
      setErrorMessage('Data can not be downloaded');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = useCallback(async () => {
    const query = getSearchQuery();
    if (!query) {
      setErrorMessage('');
      setError(null);
      getCharacters();
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/?name=${query.toLowerCase()}`);
      if (!response.ok) throw new Error(`Character "${query}" not found`);

      const data = await response.json();
      setCharacters(data.results);
      setError(null);
      setErrorMessage('');
    } catch (err) {
      console.error(`Character ${query} not found:`, err);
      setCharacters([]);
      setError(err as Error);
      setErrorMessage(
        `Character "${query}" is not found, Please try searching for another one.`
      );
    } finally {
      setIsLoading(false);
    }
  }, [getCharacters, getSearchQuery]);

  useEffect(() => {
    const storedQuery = localStorage.getItem(LOCAL_STORAGE_VALUE);
    if (storedQuery) {
      handleSearch();
    } else {
      getCharacters();
    }
  }, [handleSearch, getCharacters]);

  return (
    <div className="min-h-screen m-auto px-0 py-4 md:container justify-between align-top">
      <Header value={searchQuery} handleSearch={handleSearch} />
      <ErrorBoundary isClichedErrorButton={isClichedErrorButton}>
        <main className="px-0 py-4">
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
          <div className="m-auto w-full mt-4">
            <button
              className="bg-green-400 hover:bg-green-500 w-full py-2 px-4 duration-300"
              onClick={throwError}
            >
              ErrorBoundary
            </button>
          </div>
        </main>
      </ErrorBoundary>
    </div>
  );
}
