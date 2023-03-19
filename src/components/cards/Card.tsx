import React from 'react';
import './style.css';
import Card from 'src/types/card';

type Props = {
  card: Card;
};

function CardItem({ card }: Props) {
  const { title, thumbnail, description, price, brand, category } = card;
  return (
    <div className="card" data-testid="card">
      <p className="title">{title}</p>
      <div className="card-list">
        <img src={thumbnail} alt={title} />
        <p>{`Brand: ${brand}`}</p>
        <p>{`Category: ${category}`}</p>
        <p>{`Price: ${price} $`}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default CardItem;
