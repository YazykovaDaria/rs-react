import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://rickandmortyapi.com/api/character';

export const cardsApi = createApi({
  reducerPath: 'CardsApi',
  tagTypes: ['Cards'],
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    updateCards: build.query({
      query: (url: string) => url,
      providesTags: ['Cards'],
    }),
  }),
});

export const { useUpdateCardsQuery } = cardsApi;
