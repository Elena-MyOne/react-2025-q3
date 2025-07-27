import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { BASE_URL, LOCAL_STORAGE_VALUE } from '../consts';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import { ROUTE_PATHS } from '../routes';

beforeEach(() => {
  localStorage.clear();
});

describe('App component', () => {
  it('renders Home page and fetches characters cards', async () => {
    render(
      <MemoryRouter initialEntries={[ROUTE_PATHS.HOME]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Rick and Morty/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getAllByTestId('card').length).toBeGreaterThan(0)
    );
  });

  it('shows error boundary when error is triggered manually', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const errorBtn = await screen.getByRole('button', {
      name: /ErrorBoundary/i,
    });

    errorBtn.click();

    expect(
      await screen.findByText(
        /Error occurred. Please restart the page or try again later/i
      )
    ).toBeInTheDocument();
  });

  it('navigates to About page', async () => {
    render(
      <MemoryRouter initialEntries={[`/${ROUTE_PATHS.ABOUT}`]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/This application was developed as part of/i)
    ).toBeInTheDocument();
  });

  it('renders Not found page for invalid route', () => {
    render(
      <MemoryRouter initialEntries={['/some']}>
        <App />
      </MemoryRouter>
    );

    const notFoundText = screen.getByText(/Oh, man. Page not found/i);
    expect(notFoundText).toBeInTheDocument();
  });

  it('shows error message when API fails', async () => {
    server.use(
      http.get(BASE_URL, ({ request }) => {
        const url = new URL(request.url);
        url.searchParams.set('page', '1000');
        return HttpResponse.error();
      })
    );

    render(
      <MemoryRouter initialEntries={[ROUTE_PATHS.HOME]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(
        screen.getByText(/Data can not be downloaded/i)
      ).toBeInTheDocument()
    );
  });

  it('reads page and name params and navigates to next page', async () => {
    render(
      <MemoryRouter initialEntries={['/?name=rick&page=1']}>
        <App />
      </MemoryRouter>
    );

    const nextButton = await screen.findByRole('button', {
      name: /Next/i,
    });

    nextButton.click();

    await waitFor(() => {
      expect(screen.getByTestId(/page/i)).toHaveTextContent(/2/i);
    });
  });

  it('uses name from localStorage if no search param is present', async () => {
    localStorage.setItem(LOCAL_STORAGE_VALUE, 'rick');

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(localStorage.getItem(LOCAL_STORAGE_VALUE)).toBe('rick');
      expect(screen.getByTestId(/page/i)).toHaveTextContent(/1/i);
      expect(
        screen.getByRole('heading', {
          name: /Rick Sanchez/i,
        })
      ).toBeInTheDocument();
    });
  });
});
