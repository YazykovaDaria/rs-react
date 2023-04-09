import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Main from './Main';

describe('Main', () => {
  it('renders search bar and cards', async () => {
    const { getByTestId } = render(<Main />);
    const searchBar = getByTestId('search-bar');
    expect(searchBar).toBeInTheDocument();
  });

  it('displays spinner while loading', async () => {
    const { getByTestId } = render(<Main />);
    const searchBar = getByTestId('search-bar');
    fireEvent.submit(searchBar);
    const spinner = getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
