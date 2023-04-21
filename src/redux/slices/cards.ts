import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import Card from 'src/types/card';

type CardsState = {
  cards: Card[];
  isLoading: boolean;
  error: string;
  search: string;
};

export const fetchCards = createAsyncThunk<Card[], string, { rejectValue: string }>(
  'cards/fetchCards',
  async function (url, { rejectWithValue }) {
    const baseUrl = 'https://rickandmortyapi.com/api/character';
    const response = await fetch(`${baseUrl}${url}`);
    const data = await response.json();
    if (data.error) {
      return rejectWithValue('Nothing was found for your request');
    }

    return data.results;
  }
);

const initialState: CardsState = {
  cards: [],
  isLoading: false,
  error: '',
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
  extraReducers: (builder) => {
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cards = action.payload;
      state.error = '';
    });

    builder.addCase(fetchCards.pending, (state) => {
      state.isLoading = true;
    });

    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    });
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export const { saveSearch } = cardsSlice.actions;

export default cardsSlice.reducer;
