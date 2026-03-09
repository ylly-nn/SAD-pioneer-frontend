
// https://vite.dev/config/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  //добвил прокси, который перехватывает все запросы с префиксом /api и cам отправляет на удаленный сервер, чтобы не срабатывал cors
  server: {
    proxy: {
      '/api': {
        
        //добавил dns запись для dev сервера, теперь можно обращаться к нему по имени
        target: 'http://dev.pionner.ru',
        changeOrigin: true,
        
        
      },
    },
  },
});
