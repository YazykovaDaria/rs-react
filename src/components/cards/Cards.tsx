import React from 'react';
import Card from 'src/types/card';
import CardItem from './Card';

type Props = {
  cards: Card[];
};

function Cards({ cards }: Props) {
  return (
    <>
      <p>Products</p>
      {cards.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
    </>
  );
}

export default Cards;
