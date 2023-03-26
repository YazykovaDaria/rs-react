import React from 'react';
import { render, screen } from '@testing-library/react';
import Cards from './Cards';
import data from 'src/tests/cardsData';

const mockCards = data;

describe('Cards', () => {
  it('renders the title', () => {
    render(<Cards cards={mockCards} />);
    const titleElement = screen.getByText('Products');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the correct number of cards', () => {
    render(<Cards cards={mockCards} />);
    const cardElements = screen.getAllByTestId('card');
    expect(cardElements.length).toBe(mockCards.length);
  });
});
