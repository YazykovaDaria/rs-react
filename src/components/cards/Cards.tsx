import React, { useState } from 'react';
import Card from 'src/types/card';
import CardItem from './Card';
import { getCharacter } from 'src/utils/utils';
import DetailCard from './DetailCard';
import Modal from '../modal/Modal';

type Props = {
  cards: Card[];
};

function Cards({ cards }: Props) {
  const [isModal, setModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [cardDetail, setCardDetail] = useState<Card>(cards[0]);

  const showModal = async (id: number) => {
    const url = `/${id}`;
    setLoading(true);
    const data = await getCharacter(url);
    if (data) {
      setCardDetail(data);
      setLoading(false);
      setModal(true);
    }
  };

  return (
    <>
      {isLoading && <p>loading</p>}
      <Modal isOpen={isModal} onClose={() => setModal(false)}>
        <DetailCard card={cardDetail}></DetailCard>
      </Modal>

      <p className="title">Rick and Morty characters</p>
      <div className="cards">
        {cards.map((card) => (
          <CardItem key={card.id} card={card} showCardInfo={showModal} />
        ))}
      </div>
    </>
  );
}

export default Cards;
