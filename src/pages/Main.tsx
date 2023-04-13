import React, { useState, useEffect } from 'react';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateCards } from 'src/redux/slices/cards';
import Search from 'src/components/search/Search';
import getSavedSearchVal from 'src/utils/utils';
import Cards from 'src/components/cards/Cards';
import { getCharacters } from 'src/utils/utils';
import Spiner from 'src/components/spinner/Spinner';
import Card from 'src/types/card';

function Main() {
  const data = useSelector((state) => state.cards.cards);
  const dispatch = useDispatch();
  const updateData = (cards: Card[]) => dispatch(updateCards({ cards }));
  const [isLoading, setLoading] = useState(false);
  const savedSearchVal = getSavedSearchVal();

  const getSearchUrl = (url: string) => `/?name=${url}`;

  useEffect(() => {
    const fetchData = async () => {
      const cards = await getCharacters(getSearchUrl(savedSearchVal));
      updateData(cards);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeData = async (url: string) => {
    setLoading(true);
    const cards = await getCharacters(getSearchUrl(url));
    setLoading(false);
    updateData(cards);
  };

  console.log(data);

  return (
    <div className="wrapper">
      <Search value={getSavedSearchVal()} onSubmit={changeData} />
      <div>
        {isLoading && <Spiner></Spiner>}
        {data.length === 0 ? (
          <p className="title">Nothing was found for your request</p>
        ) : (
          <Cards cards={data}></Cards>
        )}
      </div>
    </div>
  );
}

export default Main;
