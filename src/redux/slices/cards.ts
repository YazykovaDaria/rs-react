import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Card from 'src/types/card';

const cards: Card[] = [];

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    cards,
  },
  reducers: {
    updateCards(state, action) {
      state.cards = action.payload.cards;
    },
  },
});

export const { updateCards } = cardsSlice.actions;

export default cardsSlice.reducer;
