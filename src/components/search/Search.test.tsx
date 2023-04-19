import React from 'react';
import { describe, it } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from 'src/tests/test-utils';

import Search from './Search';

describe('SearchBar', () => {
  it('SearchBar loads value from Redux store', () => {
    const initialState = {
      search: 'rick',
      cards: [],
      isLoading: false,
      error: '',
    };
    const { getByDisplayValue } = renderWithProviders(<Search />, {
      preloadedState: {
        cards: initialState,
      },
    });
    const searchText = getByDisplayValue('rick');
    expect(searchText).toBeInTheDocument();
  });

  it('Save search value after submit', () => {
    const testValue = 'new value';

    renderWithProviders(<Search />);
    const input = screen.getByPlaceholderText('Search by names');
    const form = screen.getByTestId('search-bar');
    fireEvent.change(input, { target: { value: testValue } });
    fireEvent.submit(form);
    renderWithProviders(<Search></Search>);
    const searchText = screen.getByDisplayValue(testValue);
    expect(searchText).toBeInTheDocument();
  });
});
