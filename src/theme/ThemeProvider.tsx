import { useEffect, useState } from 'react';
import { LOCAL_STORAGE_THEME, THEME, type Theme } from '../consts';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(THEME.LIGHT);

  useEffect(() => {
    const savedTheme = localStorage.getItem(
      LOCAL_STORAGE_THEME
    ) as Theme | null;

    if (savedTheme === THEME.DARK || savedTheme === THEME.LIGHT) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME, theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
