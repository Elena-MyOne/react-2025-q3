import { BrowserRouter } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { mockCharacter } from '../mocks/mockCharacter';

const MockCharacterCard = () => {
  return (
    <BrowserRouter>
      <CharacterCard character={mockCharacter} />
    </BrowserRouter>
  );
};

describe('CharacterCard component', () => {
  it('renders the relevant card data', () => {
    render(<MockCharacterCard />);
    const cardImage = screen.getByRole('img', {
      name: /character rick sanchez image/i,
    });
    const cardName = screen.getByRole('heading', {
      name: /Rick Sanchez/i,
    });
    const gender = screen.getByText(/Gender: Male/i);
    const species = screen.getByText(/Species: Human/i);

    expect(cardImage).toBeInTheDocument();
    expect(cardName).toBeInTheDocument();
    expect(gender).toBeInTheDocument();
    expect(species).toBeInTheDocument();
  });
});
