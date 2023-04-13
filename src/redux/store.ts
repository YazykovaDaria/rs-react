import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './slices/cards';

export default configureStore({
  reducer: {
    cards: cardsReducer,
  },
});
