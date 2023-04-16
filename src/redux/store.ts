import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './slices/cards';
import userCardReducer from './slices/userCards';

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    userCards: userCardReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
