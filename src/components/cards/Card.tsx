import React from 'react';
import './style.css';
import Card from 'src/types/card';

type Props = {
  card: Card;
  showCardInfo: (id: number) => void;
};

function CardItem({ card, showCardInfo }: Props) {
  const handleClick = () => showCardInfo(card.id);

  const { image, name } = card;
  return (
    <div className="card" data-testid="card">
      <p className="title">{name}</p>
      <div className="card-list">
        <img src={image} alt={name} />

        <button type="button" className="btn" onClick={handleClick}>
          Show more
        </button>
      </div>
    </div>
  );
}

export default CardItem;
