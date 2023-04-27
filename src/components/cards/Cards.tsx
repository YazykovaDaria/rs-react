import React, { useState } from 'react';
import { useAppSelector } from 'src/hooks/reduxHook';
import { useUpdateCardsQuery } from 'src/redux/slices/cardsApi';
import Card from 'src/types/card';
import CardItem from './Card';
import DetailCard from './DetailCard';
import Spiner from '../spinner/Spinner';
import Modal from '../modal/Modal';

function Cards() {
  const [isModal, setModal] = useState(false);

  const [cardDetail, setCardDetail] = useState<Card | null>(null);
  const { search } = useAppSelector((state) => state.cards);

  const getSearchUrl = (url: string) => `/?name=${url}`;
  const { data, isLoading } = useUpdateCardsQuery(getSearchUrl(search));

  if (!data) {
    return <p>Nothing was found for yor request</p>;
  }
  const { results } = data;

  const showModal = (id: number) => {
    const card = results.find((card: Card) => card.id === id);
    if (card) {
      setCardDetail(card);
      setModal(true);
    }
  };

  return (
    <div data-testid="cards">
      {isLoading && <Spiner></Spiner>}
      <Modal isOpen={isModal} onClose={() => setModal(false)}>
        {cardDetail && <DetailCard card={cardDetail}></DetailCard>}
      </Modal>

      <h2 className="title">Rick and Morty characters</h2>
      <div className="cards">
        {results &&
          results.map((card: Card) => (
            <CardItem key={card.id} card={card} showCardInfo={showModal} />
          ))}
      </div>
    </div>
  );
}

export default Cards;
