import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Pagination from '../components/Pagination';

const baseProps = {
  currentPage: 1,
  pages: 2,
  prevPage: false,
  nextPage: true,
  setCurrentPage: vi.fn(),
};

const MockPagination = () => {
  return (
    <BrowserRouter>
      <Pagination {...baseProps} />
    </BrowserRouter>
  );
};

describe('Pagination component', () => {
  it('renders component elements', () => {
    render(<MockPagination />);
    expect(screen.getByText(/Previous/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });

  it('renders previous button correctly', () => {
    render(<MockPagination />);
    const previous = screen.getByText(/Previous/i);
    expect(previous).toBeDisabled();
  });

  it('renders next button correctly', async () => {
    const mockSetCurrentPage = vi.fn();

    render(
      <BrowserRouter>
        <Pagination {...baseProps} setCurrentPage={mockSetCurrentPage} />
      </BrowserRouter>
    );

    const next = screen.getByText(/Next/i);
    expect(next).toBeEnabled();

    fireEvent.click(next);

    await waitFor(() => {
      expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
    });
  });

  it('calls setCurrentPage when last page button is clicked', async () => {
    const mockSetCurrentPage = vi.fn();

    render(
      <BrowserRouter>
        <Pagination {...baseProps} setCurrentPage={mockSetCurrentPage} />
      </BrowserRouter>
    );

    const last = screen.getByText(/2/i);
    fireEvent.click(last);

    await waitFor(() => {
      expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
    });
  });

  it('calls setCurrentPage when Previous button is clicked', async () => {
    const mockSetCurrentPage = vi.fn();

    render(
      <BrowserRouter>
        <Pagination
          {...baseProps}
          currentPage={2}
          prevPage={true}
          setCurrentPage={mockSetCurrentPage}
        />
      </BrowserRouter>
    );

    const previous = screen.getByText(/Previous/i);
    expect(previous).toBeEnabled();

    fireEvent.click(previous);

    await waitFor(() => {
      expect(mockSetCurrentPage).toHaveBeenCalledWith(1);
    });
  });
});
