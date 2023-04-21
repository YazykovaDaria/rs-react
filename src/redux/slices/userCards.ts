import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'src/types/card';

type UserCardsState = {
  userCards: User[];
};

const initialState: UserCardsState = {
  userCards: [],
};

const userCardsSlice = createSlice({
  name: 'userCards',
  initialState,
  reducers: {
    addUserCard(state, action: PayloadAction<User>) {
      state.userCards.push(action.payload);
    },
  },
});

export const { addUserCard } = userCardsSlice.actions;

export default userCardsSlice.reducer;
