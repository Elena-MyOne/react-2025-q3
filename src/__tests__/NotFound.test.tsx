import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NotFoundPage from '../pages/NotFound';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ThemeProvider } from '../theme/ThemeProvider';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(() => mockNavigate),
}));

const MockNotFoundPage = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NotFoundPage />
      </ThemeProvider>
    </Provider>
  );
};

describe('404 Page component', () => {
  it('404 page is s displayed when navigating to an invalid route', () => {
    render(<MockNotFoundPage />);
    const notFoundText = screen.getByText(/Oh, man. Page not found/i);
    expect(notFoundText).toBeInTheDocument();

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('should go back on button click', async () => {
    render(<MockNotFoundPage />);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement, new MouseEvent('click', { bubbles: true }));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
