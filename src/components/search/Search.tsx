import React, { useState } from 'react';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCards, saveSearch } from 'src/redux/slices/cards';

const Search = () => {
  const { search } = useSelector((state) => state.cards);

  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState(search);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveSearch({ search: searchValue }));
    dispatch(fetchCards(`/?name=${searchValue}`));
  };

  return (
    <form onSubmit={handleSubmit} data-testid="search-bar">
      <input
        type="search"
        value={searchValue}
        onChange={handleValueChange}
        className="search"
        placeholder="Search by names"
      />
      <button type="submit" className="search search-btn">
        Search
      </button>
    </form>
  );
};

export default Search;
