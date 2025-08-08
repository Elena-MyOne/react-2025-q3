import { MdSunny } from 'react-icons/md';
import { FaMoon } from 'react-icons/fa6';
import { THEME } from '../consts';
import { useTheme } from '../hooks/useTheme';

export default function ThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="text-green-600 text-xl cursor-pointer duration-300 hover:text-green-700"
    >
      {theme === THEME.LIGHT ? <MdSunny /> : <FaMoon />}
    </button>
  );
}
