import React from 'react';
import Search from 'src/components/search/Search';
import getSavedSearchVal from 'src/utils/utils';

function Main() {
  return (
    <>
      <p>Main page</p>
      <Search value={getSavedSearchVal()} />
    </>
  );
}

export default Main;
