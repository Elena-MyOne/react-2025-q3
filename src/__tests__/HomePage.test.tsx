import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import HomePage from '../pages/HomePage';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ThemeProvider } from '../theme/ThemeProvider';

describe('HomePage component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays loader when loading', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <HomePage />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );
    const loader = screen.getByText(/Loading .../i);
    expect(loader).toBeInTheDocument();
  });

  it('displays cards list after successful fetch', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <HomePage />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );
    const card1 = await screen.findByText(/Rick Sanchez/);
    const card2 = await screen.findByText(/Morty Smith/);
    const card3 = await screen.findByText(/Summer Smith/);

    expect(card1).toBeInTheDocument();
    expect(card2).toBeInTheDocument();
    expect(card3).toBeInTheDocument();
  });

  it('renders the error boundary button', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <HomePage />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );
    expect(
      screen.getByRole('button', { name: /ErrorBoundary/i })
    ).toBeInTheDocument();
  });
});
