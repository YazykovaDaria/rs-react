import cardsReducer from './slices/cards';
import userCardReducer from './slices/userCards';
import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { cardsApi } from './slices/cardsApi';

const rootReducer = combineReducers({
  cards: cardsReducer,
  userCards: userCardReducer,
  [cardsApi.reducerPath]: cardsApi.reducer,
});
export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(cardsApi.middleware),
    preloadedState,
  });
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
