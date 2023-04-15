import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Card from 'src/types/card';

const cards: Card[] = [];

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async function (url, { rejectWithValue }) {
    try {
      const baseUrl = 'https://rickandmortyapi.com/api/character';
      const response = await fetch(`${baseUrl}${url}`);
      const data = await response.json();
      if (data.error) {
        throw new Error('Nothing was found for your request');
      }

      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    cards,
    isLoading: false,
    error: '',
    search: '',
  },
  reducers: {
    updateCards(state, action) {
      state.cards = action.payload.cards;
    },
    saveSearch(state, action) {
      state.search = action.payload.search;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cards = action.payload;
      state.error = '';
    });

    builder.addCase(fetchCards.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchCards.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { updateCards, saveSearch } = cardsSlice.actions;

export default cardsSlice.reducer;
