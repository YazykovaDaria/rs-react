import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Search from './Search';
import store from 'src/redux/store';
import { saveSearch } from 'src/redux/slices/cards';

describe('SearchBar', () => {
  const dispatch = store.dispatch;
  it('SearchBar loads value from Redux store', async () => {
    dispatch(saveSearch('rick'));
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </MemoryRouter>
    );
    const searchText = screen.getByDisplayValue('rick');
    expect(searchText).toBeInTheDocument();
  });
});
