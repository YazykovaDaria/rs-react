import React from 'react';
import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import cardsData from 'src/tests/cardsData';
import Cards from './Cards';
import { renderWithProviders } from 'src/tests/test-utils';

export const handlers = [
  rest.get('https://rickandmortyapi.com/api/character', (req, res, ctx) => {
    const searchVal = req.url.searchParams.get('name');

    if (searchVal === ';') {
      return res(ctx.status(200), ctx.json({ data: { error: 'error' } }));
    }

    return res(ctx.status(200), ctx.json({ results: cardsData }));
  }),
];

const server = setupServer(...handlers);

describe('Cards', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('render cards correctly', async () => {
    renderWithProviders(<Cards></Cards>);
    const titleElement = screen.getByText('Rick and Morty characters');
    expect(titleElement).toBeInTheDocument();
    const cards = await screen.findAllByTestId('card');
    expect(cards.length).toBe(cardsData.length);
  });

  it('render error message when cards data not found', () => {
    const error = 'error';
    const initialState = {
      search: '',
      cards: [],
      isLoading: false,
      error,
    };
    renderWithProviders(<Cards></Cards>, {
      preloadedState: {
        cards: initialState,
      },
    });
    const message = screen.getByText(error);
    expect(message).toBeInTheDocument();
  });
});
