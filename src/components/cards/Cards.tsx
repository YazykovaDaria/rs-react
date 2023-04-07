import React from 'react';
//import Card from 'src/types.ts/card';
import CardItem from './Card';

// type Props = {
//   cards: Card[];
// };

function Cards({ cards }) {
  return (
    <>
      <p className="title">Products</p>
      <div className="cards">
        {cards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </div>
    </>
  );
}

export default Cards;
