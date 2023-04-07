import React from 'react';
import './style.css';
// import Card from 'src/types.ts/card';

// type Props = {
//   card: Card;
// };

function CardItem({ card }) {
  const { image, name, status, species } = card;
  return (
    <div className="card" data-testid="card">
      <p className="title">{name}</p>
      <div className="card-list">
        <img src={image} alt={name} />
        <p>{`Status: ${status}`}</p>
        <p>{`Species: ${species}`}</p>
      </div>
    </div>
  );
}

export default CardItem;
