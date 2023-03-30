import React, { useState, useEffect } from 'react';
import './style.css';

interface IProps {
  value: string;
}

const Search: React.FC<IProps> = ({ value }) => {
  const [searchValue, setSearchValue] = useState(value);

  useEffect(() => {
    return () => localStorage.setItem('search', searchValue);
  }, [searchValue]);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  return (
    <form>
      <input type="search" value={searchValue} onChange={handleValueChange} className="search" />
      <button type="submit" className="search search-btn">
        Search
      </button>
    </form>
  );
};

export default Search;
