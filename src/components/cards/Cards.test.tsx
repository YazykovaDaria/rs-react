import React from 'react';
import { screen } from '@testing-library/react';
import Cards from './Cards';
import { renderWithProviders } from 'src/tests/test-utils';

describe('Cards', () => {
  it('renders the title', async () => {
    renderWithProviders(<Cards></Cards>);
    const titleElement = screen.getByText('Rick and Morty characters');
    expect(titleElement).toBeInTheDocument();
  });
});
