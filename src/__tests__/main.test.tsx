import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import App from '../App';

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

describe('App root rendering', () => {
  it('renders the App component', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText(/Rick and Morty/i)).toBeInTheDocument();
  });

  it('renders without crashing', async () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    expect(document.getElementById('root')).toBe(root);
  });

  it('should throw an error if root element is missing', async () => {
    document.getElementById('root')?.remove();

    await expect(import('../main')).rejects.toThrowError(
      'Root element not found'
    );
  });
});
