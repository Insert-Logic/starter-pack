import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({ target: 'react', routesDirectory: 'src/logics', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      queries: path.resolve(__dirname, 'src/queries'),
      types: path.resolve(__dirname, 'src/types'),
      util: path.resolve(__dirname, 'src/util'),
      assets: path.resolve(__dirname, 'src/assets'),
      logics: path.resolve(__dirname, 'src/logics'),
      api: path.resolve(__dirname, 'src/logics/event-driven'),
    },
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['host.docker.internal'],
    proxy: {
      '/api': {
        target: 'http://o8.localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
