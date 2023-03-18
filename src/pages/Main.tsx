import React from 'react';
import './style.css';
import Search from 'src/components/search/Search';
import getSavedSearchVal from 'src/utils/utils';
import Cards from 'src/components/cards/Cards';
import data from 'src/tests/cardsData';

function Main() {
  return (
    <div className="wrapper">
      <Search value={getSavedSearchVal()} />
      <Cards cards={data} />
    </div>
  );
}

export default Main;
