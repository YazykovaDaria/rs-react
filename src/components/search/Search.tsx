import React, { useState } from 'react';
import './style.css';

interface IProps {
  value: string;
  onSubmit: (url: string) => void;
}

const Search: React.FC<IProps> = ({ value, onSubmit }) => {
  const [searchValue, setSearchValue] = useState(value);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('search', searchValue);
    onSubmit(searchValue);
  };

  return (
    <form onSubmit={handleSubmit}>
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
