import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../consts';
import HomePage from '../pages/HomePage';
import { mockCharactersList } from '../mocks/mockCharactersList';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ThemeProvider } from '../theme/ThemeProvider';

const baseProps = {
  isLoading: false,
  isClichedErrorButton: false,
  characters: mockCharactersList.results,
  errorMessage: '',
  throwError: vi.fn(),
  pages: mockCharactersList.info.pages,
  currentPage: 1,
  setCurrentPage: vi.fn<(page: number) => void>(),
};

describe('HomePage component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays loader when loading', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <HomePage {...baseProps} isLoading={true} />
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
            <HomePage {...baseProps} />
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

  it('displays error message when fetch fails', async () => {
    server.use(
      http.get(BASE_URL, ({ request }) => {
        const url = new URL(request.url);
        url.searchParams.set('page', '1000');
        return HttpResponse.error();
      })
    );

    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <HomePage
              {...baseProps}
              errorMessage="Data can not be downloaded"
              characters={[]}
            />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    const errorMessage = await screen.findByText(/Data can not be downloaded/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders the error boundary button', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <HomePage {...baseProps} />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );
    expect(
      screen.getByRole('button', { name: /ErrorBoundary/i })
    ).toBeInTheDocument();
  });
});
