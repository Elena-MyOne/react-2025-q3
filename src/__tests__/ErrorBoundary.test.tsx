import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ErrorBoundary from '../components/ErrorBoundary';

const MockErrorBoundary = () => {
  return (
    <ErrorBoundary isClichedErrorButton={false}>
      <div>Child Component</div>
    </ErrorBoundary>
  );
};

describe('ErrorBoundary component', () => {
  it('renders children when there is no error in the app', () => {
    render(<MockErrorBoundary />);
    const text = screen.getByText('Child Component');
    expect(text).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const ErrorCreator = () => {
      throw new Error('Test error case');
    };

    render(
      <ErrorBoundary isClichedErrorButton={false}>
        <ErrorCreator />
      </ErrorBoundary>
    );

    const text = screen.getByText('Please restart the page or try again later');

    expect(text).toBeInTheDocument();
  });
});
