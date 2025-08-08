import { CiSearch } from 'react-icons/ci';
import { LOCAL_STORAGE_VALUE } from '../consts';
import useLocalStorage from '../hooks/useLocalStorage';
import { Link, useSearchParams } from 'react-router-dom';
import { ROUTE_PATHS } from '../routes';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { setCurrentPage, setSavedValue } from '../redux/slices/charactersSlice';
import ThemeButton from './ThemeButton';

export default function Header() {
  const [value, setValue] = useLocalStorage(LOCAL_STORAGE_VALUE, '');

  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleSearchButton = () => {
    dispatch(setSavedValue(value));
    dispatch(setCurrentPage(1));
    searchParams.set('name', value);
    setSearchParams(searchParams);
  };

  const handleSearchForm = (event: React.FormEvent) => {
    event.preventDefault();
    handleSearchButton();
  };

  return (
    <header className="flex m-auto gap-4  p-0 py-4 md:container justify-between items-center ">
      <Link
        to={ROUTE_PATHS.HOME}
        className="font-bold text-primary text-3xl text-green-500 duration-300 hover:text-green-700"
        style={{ fontFamily: 'Permanent Marker, cursive' }}
      >
        Rick And Morty
      </Link>
      <div className="flex items-center gap-10 ">
        <ThemeButton />
        <Link
          to={ROUTE_PATHS.ABOUT}
          className="font-medium text-green-600 cursor-pointer duration-300 hover:text-green-700 text-lg"
        >
          About
        </Link>
        <form onSubmit={handleSearchForm} data-testid="search-form">
          <div className="flex items-center">
            <input
              type="text"
              className="grow border-gray-300 border-[1px] p-2 bg-white text-gray-500"
              placeholder="Search..."
              value={value}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="text-2xl cursor-pointer text-black border-[1px] border-transparent bg-green-500 hover:bg-green-600 p-2 duration-300"
              onClick={handleSearchButton}
              data-testid="searchBtn"
            >
              <CiSearch />
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}
