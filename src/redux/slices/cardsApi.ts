import { createApi } from '@reduxjs/toolkit/query/react';
import * as rtkQuery from '@reduxjs/toolkit/dist/query/react/index.js';
import Card from 'src/types/card';

type TypeRtkQuery = typeof rtkQuery & { default?: unknown };
const { fetchBaseQuery } = ((rtkQuery as TypeRtkQuery).default ?? rtkQuery) as typeof rtkQuery;

type CardsInfo = {
  count: number;
  pages: number;
  next: string;
  prev: null | string;
};

type CardsResponse = {
  info: CardsInfo;
  results: Card[];
};

const baseUrl = 'https://rickandmortyapi.com/api/character';

export const cardsApi = createApi({
  reducerPath: 'CardsApi',
  tagTypes: ['Cards'],
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    updateCards: build.query<CardsResponse, string>({
      query: (url: string) => url,
      providesTags: ['Cards'],

      transformResponse: (res: unknown): CardsResponse => {
        const data: CardsResponse = res as CardsResponse;
        return data;
      },
    }),
  }),
});

export const { useUpdateCardsQuery } = cardsApi;
