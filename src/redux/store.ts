import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './slices/cards';
import userCardReducer from './slices/userCards';

export default configureStore({
  reducer: {
    cards: cardsReducer,
    userCards: userCardReducer,
  },
});
