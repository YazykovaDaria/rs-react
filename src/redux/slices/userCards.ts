import { createSlice } from '@reduxjs/toolkit';
import { User } from 'src/types/card';

const userCards: User[] = [];

const userCardsSlice = createSlice({
  name: 'userCards',
  initialState: {
    userCards,
  },
  reducers: {
    addUserCard(state, action) {
      state.userCards.push(action.payload.card);
    },
  },
});

export const { addUserCard } = userCardsSlice.actions;

export default userCardsSlice.reducer;
