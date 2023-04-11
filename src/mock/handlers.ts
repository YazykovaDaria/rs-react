import { rest } from 'msw';
import data from 'src/tests/cardsData';

export const handlers = [
  rest.get('https://rickandmortyapi.com/api/character', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ results: data }));
  }),
];
