import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Header from '../components/Header';
import { LOCAL_STORAGE_VALUE } from '../consts';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ThemeProvider } from '../theme/ThemeProvider';

const mockHandleSearch = vi.fn().mockResolvedValue(undefined);

const MockHeader = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <Header value="" handleSearch={mockHandleSearch} />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};

describe('Header component', () => {
  describe('header component rendering', () => {
    it('renders logo as a link with correct text', () => {
      render(<MockHeader />);
      const logoElement = screen.getByText(/Rick and Morty/i);
      expect(logoElement).toBeInTheDocument();
    });

    it('renders search form with search input and submit button', () => {
      render(<MockHeader />);
      const FormElement = screen.getByTestId('search-form');
      expect(FormElement).toBeInTheDocument();
      expect(FormElement).toContainHTML('button');
      expect(FormElement).toContainHTML('input');
    });
  });

  describe('Search component', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should to be able to type in input', () => {
      render(<MockHeader />);
      const inputElement = screen.getByPlaceholderText(
        /Search.../i
      ) as HTMLInputElement;
      fireEvent.change(inputElement, { target: { value: 'rick' } });
      expect(inputElement.value).toBe('rick');
    });

    it('retrieves the value from local storage upon mounting', () => {
      const initialValue = 'initialValue';
      localStorage.setItem(LOCAL_STORAGE_VALUE, initialValue);
      render(<MockHeader />);
      const inputElement = screen.getByPlaceholderText(
        /Search.../i
      ) as HTMLInputElement;
      expect(inputElement.value).toBe(initialValue);
    });

    it('saves input value in local storage', () => {
      render(<MockHeader />);
      const buttonElement = screen.getByTestId(
        'searchBtn'
      ) as HTMLButtonElement;
      const inputElement = screen.getByPlaceholderText(
        /Search.../i
      ) as HTMLInputElement;
      fireEvent.change(inputElement, { target: { value: 'rick' } });
      fireEvent.click(buttonElement);
      expect(localStorage.getItem(LOCAL_STORAGE_VALUE)).toBe('rick');
    });
  });
});
