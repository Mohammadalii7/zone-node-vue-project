import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173, // Keep Vite on port 5173
    proxy: {
      '/account': {
        target: 'http://localhost:3000', // Backend running on port 3000
        changeOrigin: true,
        secure: false, // For development, disable SSL verification
      },
    },
  },
});
