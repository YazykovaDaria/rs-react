import fs from 'fs';
import path from 'path';
import express from 'express';
import compression from 'compression';
import { fileURLToPath } from 'node:url';
import { ViteDevServer, createServer as createViteServer } from 'vite';

const root = process.cwd();
const isProd = process.env.NODE_ENV === 'production';
const dirname = path.dirname(fileURLToPath(import.meta.url));

const resolve = (p: string) => path.resolve(dirname, p);

async function createServer() {
  const app = express();
  app.use(compression());

  let viteServer: ViteDevServer;
  if (isProd) {
    app.use(
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false,
      })
    );
  } else {
    viteServer = await createViteServer({
      root,
      server: {
        middlewareMode: true,
      },
      appType: 'custom',
    });

    app.use(viteServer.middlewares);
  }

  app.use('*', async (req, res) => {
    const url = req.originalUrl;

    try {
      const pathToIndex = isProd ? `dist/client/index.html` : `${root}/index.html`;
      const index = fs.readFileSync(resolve(pathToIndex), 'utf8');
      const template = isProd ? index : await viteServer.transformIndexHtml(url, index);

      const { render } = isProd
        ? await import(`${root}/dist/server/entry-server.js`!)
        : await viteServer.ssrLoadModule(`${root}/src/entry-server.tsx`);

      const htmlParts = template.split('<!--app-->');

      try {
        res.write(htmlParts[0]);
        const { stream, injectPreload } = await render(req, {
          onShellReady() {
            stream.pipe(res);
          },
          onShellError(err: Error) {
            console.error(err);
          },
          onAllReady() {
            const withPreload = htmlParts[1].replace('<!--preload-->', injectPreload());
            res.write(withPreload);
            res.end();
          },
          onError(err: Error) {
            console.error(err);
          },
        });
      } catch (e) {
        if (e instanceof Response && e.status >= 300 && e.status <= 399) {
          return res.redirect(e.status, e.headers.get('Location')!);
        }
        throw e;
      }
    } catch (error) {
      if (error instanceof Error) {
        if (!isProd) {
          viteServer.ssrFixStacktrace(error);
        }

        console.log(error.stack);
        res.status(500).end(error.stack);

        return;
      }

      console.log(error);
    }
  });
  return app;
}

createServer().then((app) => {
  const port = process.env.PORT || 7456;
  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`App is listening on http://localhost:${port}`);
  });
});
