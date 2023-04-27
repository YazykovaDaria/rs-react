import type * as express from 'express';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import Router from './app/Router';
import HtmlTemplate from './app/HtmlTemplate';
import { setupStore } from './redux/store';

type Assets = {
  style?: string;
  script: string;
};
//add cards query
export const render = async (request: express.Request, res: express.Response, assets: Assets) => {
  const initialStore = setupStore({});
  const preloadedState = initialStore.getState();
  let didError = false;

  const { pipe } = renderToPipeableStream(
    <HtmlTemplate style={assets.style} preloadedState={preloadedState}>
      <Provider store={initialStore}>
        <StaticRouter location={request.originalUrl}>
          <Router />
        </StaticRouter>
      </Provider>
    </HtmlTemplate>,
    {
      onShellReady() {
        res.statusCode = didError ? 500 : 200;
        res.setHeader('content-type', 'text/html');
        pipe(res);
      },
      onShellError() {
        res.statusCode = 500;
        res.setHeader('content-type', 'text/html');
        res.send('<h1>Something went wrong</h1>');
      },
      onError(err: unknown) {
        didError = true;
        console.error(err);
      },
      bootstrapModules: [assets.script],
    }
  );
};
