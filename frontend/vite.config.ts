
// https://vite.dev/config/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        
        // основа
        target: 'http://localhost:8080', // для теста
        //target: 'http://10.129.0.3:8080', 
        changeOrigin: true,        
        rewrite: (path) => path.replace(/^\/api/, '')

        // target: 'https://dev.pionner.ru/',
        // changeOrigin: true,
        
      },
    },
  },
});
