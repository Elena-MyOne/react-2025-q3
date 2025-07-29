export const LOCAL_STORAGE_VALUE = 'RickAndMorty';

export const LOCAL_STORAGE_THEME = 'RickAndMortyTheme';

export const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type Theme = (typeof THEME)[keyof typeof THEME];
