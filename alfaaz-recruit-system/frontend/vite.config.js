import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.', // Vite root is the frontend directory
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        recruit: resolve(__dirname, 'recruit.html'),
        research: resolve(__dirname, 'research.html'),
      },
    },
  },
  server: {
    port: 3000,
  },
});
