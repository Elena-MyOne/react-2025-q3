import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailsPage from '../pages/DetailsPage';
import { mockCharacter } from '../mocks/mockCharacter';

const MockDetailsPage = (id: string) => {
  return render(
    <MemoryRouter initialEntries={[`/details/${id}`]}>
      <Routes>
        <Route path="/details/:id" element={<DetailsPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Details page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays loader when loading', () => {
    global.fetch = vi.fn(() => new Promise(() => {}) as Promise<Response>);
    MockDetailsPage('1');

    const loader = screen.getByText(/Loading .../i);
    expect(loader).toBeInTheDocument();
  });

  it('displays error message when character is not found', async () => {
    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          ok: false,
        }) as Promise<Response>
    );

    MockDetailsPage('111');

    await waitFor(() => {
      const errorMessage = screen.getByText(/Character not found/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('displays pokemon data when fetch is successful and hide component when close button is clicked', async () => {
    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockCharacter),
        }) as Promise<Response>
    );

    MockDetailsPage('1');

    await waitFor(() => {
      const name = screen.getByRole('heading', { name: /Rick Sanchez/i });
      const gender = screen.getByText(/Gender: Male/i);
      const species = screen.getByText(/Species: Human/i);
      const status = screen.getByText(/Status: Alive/i);
      const type = screen.getByText(/Type: unknown/i);
      const button = screen.getByRole('button', { name: /close details/i });

      expect(name).toBeInTheDocument();
      expect(gender).toBeInTheDocument();
      expect(species).toBeInTheDocument();
      expect(status).toBeInTheDocument();
      expect(type).toBeInTheDocument();

      fireEvent.click(button);
      expect(name).not.toBeInTheDocument();
      expect(status).not.toBeInTheDocument();
      expect(type).not.toBeInTheDocument();
      expect(button).not.toBeInTheDocument();
    });
  });
});
