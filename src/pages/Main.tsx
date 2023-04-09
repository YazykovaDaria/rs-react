import React, { useState, useEffect } from 'react';
import './style.css';
import Search from 'src/components/search/Search';
import getSavedSearchVal from 'src/utils/utils';
import Cards from 'src/components/cards/Cards';
import { getCharacters } from 'src/utils/utils';
import Spiner from 'src/components/spinner/Spinner';
import Card from 'src/types/card';

function Main() {
  const [data, setData] = useState<Card[]>([]);
  const [isLoading, setLoading] = useState(false);
  const savedSearchVal = getSavedSearchVal();

  const getSearchUrl = (url: string) => `/?name=${url}`;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacters(getSearchUrl(savedSearchVal));
      setData(data);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeData = async (url: string) => {
    setLoading(true);
    const data = await getCharacters(getSearchUrl(url));
    setLoading(false);
    setData(data);
  };

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
