import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CardsState = {
  search: string;
};

const initialState: CardsState = {
  search: '',
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    saveSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const { saveSearch } = cardsSlice.actions;

export default cardsSlice.reducer;
