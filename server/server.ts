import fs from 'fs';
import path from 'path';
import express from 'express';
import compression from 'compression';
import { fileURLToPath } from 'node:url';
import { ViteDevServer, createServer as createViteServer } from 'vite';

//fix css
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
        watch: {
          usePolling: true,
          interval: 100,
        },
        hmr: true,
      },
      appType: 'custom',
    });

    app.use(viteServer.middlewares);
  }

  app.use('*', async (req, res) => {
    try {
      // const url = req.originalUrl;

      // let template;
      if (isProd) {
        const render = (await import(`${root}/dist/server/entry-server.js`!)).render;
        const script =
          '/assets/' +
          fs
            .readdirSync(resolve(`${root}/dist/client/assets`))
            .filter((fn: string) => fn.endsWith('js'));
        const style =
          '/assets/' +
          fs
            .readdirSync(resolve(`${root}/dist/client/assets`))
            .filter((fn: string) => fn.includes('css'));
        const assets = { style, script };
        render(req, res, assets);
      } else {
        // template = fs.readFileSync(`${root}/index.html`, 'utf-8')
        // template = await viteServer.transformIndexHtml(url, template)
        const { render } = await viteServer.ssrLoadModule(`src/entry-server.tsx`);
        const assets = { script: 'src/entry-client.tsx' };
        render(req, res, assets);
      }
    } catch (e) {
      const err = e as Error;
      !isProd && viteServer.ssrFixStacktrace(err);
      console.log(err.stack);
      res.status(500).end(err.stack);
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
