import { rest } from 'msw';
import data from 'src/tests/cardsData';
import Card from 'src/types/card';

export const handlers = [
  rest.get('https://rickandmortyapi.com/api/character', (req, res, ctx) => {
    const searchVal = req.url.searchParams.get('name');
    let requestData: Card[] = data;
    if (searchVal) {
      requestData = data.filter((val) => val.name.includes(searchVal));
    }

    return res(ctx.status(200), ctx.json({ results: requestData }));
  }),
];
