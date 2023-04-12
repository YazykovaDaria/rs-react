import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/react';
import Main from './Main';
import data from 'src/tests/cardsData';

describe('Main', () => {
  it('renders search bar and cards correctly', async () => {
    const { getByTestId } = render(<Main />);
    const searchBar = getByTestId('search-bar');
    expect(searchBar).toBeInTheDocument();
    const cards = await screen.findByTestId('cards');
    expect(cards).toBeInTheDocument();
    const cardItems = await screen.findAllByTestId('card');
    expect(cardItems.length).toBe(data.length);
  });

  it('render error message when uncorrect search value', async () => {
    const { getByTestId } = render(<Main />);
    const searchBar = getByTestId('search-bar');
    fireEvent.change(searchBar.querySelector('input')!, { target: { value: ';' } });
    fireEvent.submit(searchBar);
    await waitFor(() => {
      expect(screen.getByText('Nothing was found for your request')).toBeInTheDocument();
    });
  });

  it('handles search input correctly', async () => {
    const { getByTestId } = render(<Main />);
    const searchBar = getByTestId('search-bar');
    fireEvent.change(searchBar.querySelector('input')!, { target: { value: 'Mor' } });
    fireEvent.submit(searchBar);
    await waitFor(() => {
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
      expect(getByTestId('card').querySelector('img')).toHaveAttribute(
        'src',
        'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
      );
    });
  });

  it('displays spinner while loading', async () => {
    const { getByTestId } = render(<Main />);
    const searchBar = getByTestId('search-bar');
    fireEvent.submit(searchBar);
    const spinner = getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
