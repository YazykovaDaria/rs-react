import React from 'react';
import Card from 'src/types/card';
import './style.css';

type Props = {
  card: Card;
};

const DetailCard = ({ card }: Props) => {
  const { image, name, status, species, gender, location } = card;

  return (
    <div className="card card--detail" data-testid="card">
      <p className="title">{name}</p>
      <div className="card-list">
        <img src={image} alt={name} />

        <p>{`Species: ${species}`}</p>
        <p>{`Gender: ${gender}`}</p>
        <p>{`Location: ${location.name}`}</p>
        <p>{`Status: ${status}`}</p>
      </div>
    </div>
  );
};

export default DetailCard;
