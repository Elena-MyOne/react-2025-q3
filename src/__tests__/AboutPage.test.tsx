import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AboutPage from '../components/AboutPage';

describe('AboutPage', () => {
  it('renders the course and author information', () => {
    render(<AboutPage />);

    expect(
      screen.getByText(/This application was developed as part of/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /React course at RS School/i })
    ).toHaveAttribute('href', 'https://rs.school/courses/reactjs');

    expect(screen.getByText(/Created by Elena Iakovenko/i)).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /here/i })).toHaveAttribute(
      'href',
      'https://github.com/Elena-MyOne'
    );
  });
});
