import { THEME } from '../consts';

export default function useThemeClasses(theme: string) {
  return {
    bg: theme === THEME.LIGHT ? 'bg-gray-50' : 'bg-black',
    text: theme === THEME.LIGHT ? 'text-black' : 'text-white',
    border: theme === THEME.LIGHT ? 'border-gray-300' : 'border-gray-700',
  };
}
