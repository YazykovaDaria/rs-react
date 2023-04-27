import { PreloadedState } from '@reduxjs/toolkit';
import React from 'react';

import { RootState } from 'src/redux/store';

interface Props {
  preloadedState: PreloadedState<RootState>;
  style?: string;
  children: React.ReactNode;
}

function HtmlTemplate({ style, preloadedState, children }: Props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        {import.meta.env.DEV && (
          <script
            type="module"
            dangerouslySetInnerHTML={{
              __html: `
                import RefreshRuntime from '/@react-refresh';
                RefreshRuntime.injectIntoGlobalHook(window);
                window.$RefreshReg$ = () => {};
                window.$RefreshSig$ = () => (type) => type;
                window.__vite_plugin_react_preamble_installed__ = true;
                `,
            }}
          />
        )}
        {style && <link rel="stylesheet" href={style} />}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Rs-react</title>
      </head>
      <body>
        <div id="root">{children}</div>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
              /</g,
              '\\u003c'
            )}`,
          }}
        />
      </body>
    </html>
  );
}

export default HtmlTemplate;
