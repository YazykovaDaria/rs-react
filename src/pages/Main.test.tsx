import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { screen } from '@testing-library/react';
import { beforeAll, afterAll } from 'vitest';
import Main from './Main';
import data from 'src/tests/cardsData';

const server = setupServer(
  rest.get('https://rickandmortyapi.com/api/character', (_req, res, ctx) => {
    return res(ctx.json({ results: data }));
  })
);

describe('Main', () => {
  beforeAll(async () => {
    await server.listen();
  });

  afterAll(async () => {
    await server.close();
  });

  it('renders search bar', async () => {
    const { getByTestId } = render(<Main />);
    const searchBar = getByTestId('search-bar');
    expect(searchBar).toBeInTheDocument();
  });

  it('renders error message when data not found', async () => {
    render(<Main />);

    server.use(
      rest.get('https://rickandmortyapi.com/api/character/name=;', (_req, res, ctx) => {
        return res(ctx.json({ results: [] }));
      })
    );

    const message = await screen.findByText('Nothing was found for your request');
    expect(message).toBeInTheDocument();
  });

  it('displays spinner while loading', async () => {
    const { getByTestId } = render(<Main />);
    const searchBar = getByTestId('search-bar');
    fireEvent.submit(searchBar);
    const spinner = getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
