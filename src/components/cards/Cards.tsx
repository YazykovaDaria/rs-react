import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCards } from 'src/redux/slices/cards';
import Card from 'src/types/card';
import CardItem from './Card';
import DetailCard from './DetailCard';
import Spiner from '../spinner/Spinner';
import Modal from '../modal/Modal';

function Cards() {
  const dispatch = useDispatch();
  const { cards, isLoading, error, search } = useSelector((state) => state.cards);

  const getSearchUrl = (url: string) => `/?name=${url}`;

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchCards(getSearchUrl(search)));
    };
    fetchData();
  }, [dispatch]);

  const [isModal, setModal] = useState(false);

  const [cardDetail, setCardDetail] = useState<Card>(cards[0]);

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
        <DetailCard card={cardDetail}></DetailCard>
      </Modal>

      <p className="title">Rick and Morty characters</p>
      <div className="cards">
        {cards.map((card) => (
          <CardItem key={card.id} card={card} showCardInfo={showModal} />
        ))}
      </div>
    </div>
  );
}

export default Cards;
