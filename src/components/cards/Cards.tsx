import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/reduxHook';
import { fetchCards } from 'src/redux/slices/cards';
import Card from 'src/types/card';
import CardItem from './Card';
import DetailCard from './DetailCard';
import Spiner from '../spinner/Spinner';
import Modal from '../modal/Modal';

function Cards() {
  const dispatch = useAppDispatch();
  const { cards, isLoading, error, search } = useAppSelector((state) => state.cards);

  const getSearchUrl = (url: string) => `/?name=${url}`;

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchCards(getSearchUrl(search)));
    };
    fetchData();
  }, [search, dispatch]);

  const [isModal, setModal] = useState(false);

  const [cardDetail, setCardDetail] = useState<Card | null>(null);

  const showModal = (id: number) => {
    const card = cards.find((card) => card.id === id);
    if (card) {
      setCardDetail(card);
      setModal(true);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div data-testid="cards">
      {isLoading && <Spiner></Spiner>}
      <Modal isOpen={isModal} onClose={() => setModal(false)}>
        {cardDetail && <DetailCard card={cardDetail}></DetailCard>}
      </Modal>

      <h2 className="title">Rick and Morty characters</h2>
      <div className="cards">
        {cards.map((card) => (
          <CardItem key={card.id} card={card} showCardInfo={showModal} />
        ))}
      </div>
    </div>
  );
}

export default Cards;
