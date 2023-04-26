// import type { Request, Response, NextFunction } from 'express';
// import fs from 'fs/promises';
// import path from 'path';
import express from 'express';
// import compression from 'compression';
// import serveStatic from 'serve-static';
// import { createServer as createViteServer } from 'vite';

// const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;

// const resolve = (p: string) => path.resolve(__dirname, p);

async function createServer(isProd = process.env.NODE_ENV === 'production') {
  const app = express();
  // const vite = await createViteServer({
  //   server: { middlewareMode: true },
  //   appType: 'custom',
  //   logLevel: isTest ? 'error' : 'info',
  // });

  app.get('/', function (request, response) {
    // отправляем ответ
    response.send('<h2>Привет Express!</h2>');
  });

  const port = process.env.PORT || 7456;
  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`App is listening on http://localhost:${port}`);
  });
}

createServer();
