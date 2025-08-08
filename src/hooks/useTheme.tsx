import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error('The useTheme hook must be used with ThemeProvider');

  return context;
};
