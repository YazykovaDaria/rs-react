import type * as express from 'express';
import React from 'react';
import { renderToPipeableStream, type RenderToPipeableStreamOptions } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import Router from './app/Router';
import { setupStore } from './redux/store';

export const render = async (request: express.Request, options: RenderToPipeableStreamOptions) => {
  const initialStore = setupStore({});
  const preloadedState = initialStore.getState();

  const injectPreload = () => {
    return `
    <script>
    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
  </script>
    `;
  };

  const stream = renderToPipeableStream(
    <Provider store={initialStore}>
      <StaticRouter location={request.originalUrl}>
        <Router />
      </StaticRouter>
    </Provider>,
    options
  );
  return { stream, injectPreload };
};
