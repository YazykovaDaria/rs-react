import React from 'react';
import { render, screen } from '@testing-library/react';
import CardItem from './Card';
import data from 'src/tests/cardsData';

describe('Test Card component', () => {
  const card = data[0];

  it('renders title, image, description, brand, category and price correctly', () => {
    render(<CardItem card={card} />);

    expect(screen.getByText('iPhone 9')).toBeInTheDocument();
    expect(screen.getByAltText('iPhone 9')).toHaveAttribute(
      'src',
      'https://i.dummyjson.com/data/products/1/thumbnail.jpg'
    );
    expect(screen.getByText('An apple mobile which is nothing like apple')).toBeInTheDocument();
    expect(screen.getByText('Brand: Apple')).toBeInTheDocument();
    expect(screen.getByText('Category: smartphones')).toBeInTheDocument();
    expect(screen.getByText('Price: 549 $')).toBeInTheDocument();
  });
});
