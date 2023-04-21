import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import CardItem from './Card';
import cardsData from 'src/tests/cardsData';
import Card from 'src/types/card';

describe('CardItem', () => {
  const card: Card = cardsData[0];

  it('renders card name and image', () => {
    const { getByTestId } = render(<CardItem card={card} showCardInfo={() => {}} />);
    expect(getByTestId('card')).toHaveTextContent('Morty Smith');
    expect(getByTestId('card').querySelector('img')).toHaveAttribute(
      'src',
      'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
    );
  });

  it('calls showCardInfo on button click', () => {
    const showCardInfoMock = vi.fn();
    const { getByTestId } = render(<CardItem card={card} showCardInfo={showCardInfoMock} />);
    fireEvent.click(getByTestId('card').querySelector('button')!);
    expect(showCardInfoMock).toHaveBeenCalledTimes(1);
    expect(showCardInfoMock).toHaveBeenCalledWith(2);
  });
});
