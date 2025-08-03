import { useSearchParams, Outlet } from 'react-router-dom';
import { useGetCharactersListQuery } from '../redux/api/apiSlice';
import ErrorBoundary from '../components/ErrorBoundary';
import CharacterCard from '../components/CharacterCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import { useState } from 'react';
import SelectedItems from '../components/SelectedItems';
import { useSelector } from 'react-redux';
import { selectSelectedItems } from '../redux/slices/selectedItemsSlice';

export default function HomePage() {
  const { selectedItems } = useSelector(selectSelectedItems);
  const [isClichedErrorButton, setIsClichedErrorButton] = useState(false);
  const [params, setParams] = useSearchParams();
  const page = Number(params.get('page') || 1);
  const name = params.get('name') || '';

  const { data, isLoading, error, isError } = useGetCharactersListQuery({
    page,
    name,
  });

  const throwError = () => {
    setIsClichedErrorButton(true);
    console.error('Error: The Error boundary button was triggered');
  };

  const updatePage = (newPage: number) => {
    setParams({ page: newPage.toString(), name });
  };

  const characters = data?.results || [];
  const pages = data?.info?.pages || 0;

  return (
    <div className="m-auto px-0 py-4 justify-between align-top">
      <ErrorBoundary isClichedErrorButton={isClichedErrorButton}>
        <div className="m-auto mt-4 flex justify-between items-center">
          <button
            className="bg-green-500 hover:bg-green-600 hover:text-white p-2 duration-300  py-2 px-4"
            onClick={throwError}
          >
            ErrorBoundary
          </button>
          {pages > 0 && (
            <Pagination
              currentPage={page}
              pages={pages}
              prevPage={page > 1}
              nextPage={page < pages}
              setCurrentPage={updatePage}
            />
          )}
        </div>

        {isError ? (
          <div className="text-red-500 text-center pt-4">
            <span>
              {'status' in error && typeof error.status === 'string'
                ? error.status
                : 'Data can not be downloaded.'}
            </span>
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
            {selectedItems.length > 0 && <SelectedItems />}
          </>
        )}
      </ErrorBoundary>
    </div>
  );
}
