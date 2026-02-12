import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  define: {
    // これが「真っ白」を防ぐための魔法の1行です
    'process.env': {},
  },
  build: {
    outDir: 'dist',
  },
});
