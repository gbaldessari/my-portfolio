import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/my-portfolio/', // Asegúrate de que coincida con el subdirectorio
  plugins: [react()],
});
