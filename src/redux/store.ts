import cardsReducer from './slices/cards';
import userCardReducer from './slices/userCards';
import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  cards: cardsReducer,
  userCards: userCardReducer,
});
export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
