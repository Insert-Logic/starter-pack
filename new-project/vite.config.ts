import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({ target: 'react',routesDirectory: 'src/logics', autoCodeSplitting: true }), react(), tailwindcss()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      queries: path.resolve(__dirname, 'src/queries'),
      types: path.resolve(__dirname, 'src/types'),
      util: path.resolve(__dirname, 'src/util'),
    },
  },
});
