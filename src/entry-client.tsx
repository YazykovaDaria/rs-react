import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore, RootState } from './redux/store';
import App from './app/App';

type WindowInstanse = Window &
  typeof globalThis & {
    __PRELOADED_STATE__?: RootState;
  };

const hudrateApp = async () => {
  const store = setupStore((window as WindowInstanse).__PRELOADED_STATE__);

  delete (window as WindowInstanse).__PRELOADED_STATE__;

  hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

hudrateApp();
