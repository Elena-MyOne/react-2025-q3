import { CiSearch } from 'react-icons/ci';
import { LOCAL_STORAGE_VALUE } from '../consts';
import useLocalStorage from '../hooks/useLocalStorage';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '../routes';
import ThemeButton from './ThemeButton';

interface HeaderProps {
  value: string;
  handleSearch(): Promise<void>;
}

export default function Header({ handleSearch }: HeaderProps) {
  const [value, setValue] = useLocalStorage(LOCAL_STORAGE_VALUE, '');

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleSearchButton = () => {
    localStorage.setItem(LOCAL_STORAGE_VALUE, value);
  };

  const handleSearchForm = (event: React.FormEvent) => {
    event.preventDefault();
    handleSearchButton();
    handleSearch();
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
            >
              <CiSearch />
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}
