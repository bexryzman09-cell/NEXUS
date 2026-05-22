// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    // Здесь вы должны определить, чем заменяется __DEFINES__
    __DEFINES__: {
      'process.env.NODE_ENV': JSON.stringify('development'),
      // ваши другие переменные окружения
    },
  },
});