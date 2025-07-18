import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { ROUTE_PATHS } from './routes';
import { useCallback, useEffect, useState } from 'react';
import { BASE_URL, LOCAL_STORAGE_VALUE } from './consts';
import type { CharactersData, CharacterData } from './models/interfaces';
import Layout from './components/Layout';
import NotFoundPage from './pages/NotFound';
import AboutPage from './components/AboutPage';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isClichedErrorButton, setIsClichedErrorButton] = useState(false);
  const [, setError] = useState<Error | null>(null);
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const throwError = () => {
    setIsClichedErrorButton(true);
    console.error('Error: The Error boundary button was triggered');
  };

  const getSearchQuery = useCallback(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_VALUE) || '';
    setSearchQuery(stored);
    return stored;
  }, []);

  const getCharacters = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}?page=${page}`);
      const data: CharactersData = await response.json();
      setCharacters(data.results);
      setTotalPages(data.info.pages);
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

  const handleSearch = useCallback(
    async (page = 1) => {
      const query = getSearchQuery();
      if (!query) {
        setErrorMessage('');
        setError(null);
        getCharacters();
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/?name=${query.toLowerCase()}&page=${page}`
        );
        if (!response.ok) throw new Error(`Character "${query}" not found`);

        const data = await response.json();
        setCharacters(data.results);
        setTotalPages(data.info.pages);
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
    },
    [getCharacters, getSearchQuery]
  );

  useEffect(() => {
    const storedQuery = localStorage.getItem(LOCAL_STORAGE_VALUE);
    if (storedQuery) {
      handleSearch(currentPage);
    } else {
      getCharacters(currentPage);
    }
  }, [handleSearch, getCharacters, currentPage]);

  return (
    <Routes>
      <Route
        path={ROUTE_PATHS.HOME}
        element={<Layout value={searchQuery} handleSearch={handleSearch} />}
      >
        <Route
          path={ROUTE_PATHS.HOME}
          element={
            <HomePage
              isLoading={isLoading}
              isClichedErrorButton={isClichedErrorButton}
              characters={characters}
              errorMessage={errorMessage}
              throwError={throwError}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pages={totalPages}
            />
          }
        />
        <Route path={ROUTE_PATHS.ABOUT} element={<AboutPage />} />
        <Route path={ROUTE_PATHS.NOTFOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
