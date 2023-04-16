import React from 'react';
import { render, screen } from '@testing-library/react';
import store from 'src/redux/store';
import { fetchCards } from 'src/redux/slices/cards';
import { Provider } from 'react-redux';
import Cards from './Cards';

describe('Cards', () => {
  const dispatch = store.dispatch;
  it('renders the title', async () => {
    dispatch(fetchCards(''));
    render(
      <Provider store={store}>
        <Cards />
      </Provider>
    );
    const titleElement = screen.getByText('Rick and Morty characters');
    expect(titleElement).toBeInTheDocument();
  });
});
