import React from 'react';
import Search from 'src/components/search/Search';
import getSavedSearchVal from 'src/utils/utils';
import Cards from 'src/components/cards/Cards';
import data from 'src/tests/cardsData';

function Main() {
  return (
    <>
      <p>Main page</p>
      <Search value={getSavedSearchVal()} />
      <Cards cards={data} />
    </>
  );
}

export default Main;
