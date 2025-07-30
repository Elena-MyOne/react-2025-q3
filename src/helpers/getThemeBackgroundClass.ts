import { THEME } from '../consts';

export function getThemeBackgroundClass(theme: string): string {
  return theme === THEME.LIGHT ? 'bg-gray-50' : 'bg-black';
}
