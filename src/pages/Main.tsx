import React from 'react';
import './style.css';
import Search from 'src/components/search/Search';
import Cards from 'src/components/cards/Cards';

function Main() {
  return (
    <div className="wrapper" data-testid="main">
      <Search />
      <Cards></Cards>
    </div>
  );
}

export default Main;
