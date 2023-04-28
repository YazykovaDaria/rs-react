/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
  plugins: [
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
  build: {
    minify: false,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.ts',
    coverage: {
      provider: 'c8',
      all: true,
      skipFull: true,
      reporter: ['text'],
      exclude: [...configDefaults.coverage.exclude, 'src/mock/*', 'src/types/*'],
    },
  },
  resolve: {
    alias: {
      src: '/src/',
    },
  },
});
