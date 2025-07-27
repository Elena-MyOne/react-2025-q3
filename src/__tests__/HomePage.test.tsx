import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../consts';
import HomePage from '../pages/HomePage';
import { mockCharactersList } from '../mocks/mockCharactersList';
import { BrowserRouter } from 'react-router-dom';

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
        <HomePage {...baseProps} isLoading={true} />
      </BrowserRouter>
    );
    const loader = screen.getByText(/Loading .../i);
    expect(loader).toBeInTheDocument();
  });

  it('displays cards list after successful fetch', async () => {
    render(
      <BrowserRouter>
        <HomePage {...baseProps} />
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
        <HomePage
          {...baseProps}
          errorMessage="Data can not be downloaded"
          characters={[]}
        />
      </BrowserRouter>
    );

    const errorMessage = await screen.findByText(/Data can not be downloaded/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders the error boundary button', () => {
    render(
      <BrowserRouter>
        <HomePage {...baseProps} />
      </BrowserRouter>
    );
    expect(
      screen.getByRole('button', { name: /ErrorBoundary/i })
    ).toBeInTheDocument();
  });
});
