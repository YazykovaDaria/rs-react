import React from 'react';
import Card from 'src/types/card';

type Props = {
  card: Card;
};

function CardItem({ card }: Props) {
  const { title, thumbnail, description, price, brand, category, discountPercentage } = card;
  return (
    <>
      <p>{title}</p>
      <div>
        <img src={thumbnail} alt={title} />
      </div>
      <div>
        <p>{brand}</p>
        <p>{category}</p>
        <p>{price}</p>
        <p>{discountPercentage} %</p>
        <p>{description}</p>
      </div>
    </>
  );
}

export default CardItem;
