/**
 * vite.config.js
 *
 * MELHORIA [5 — complemento]: Code splitting manual para evitar
 * bundle único de 1.1MB com lucide-react incluído.
 *
 * Chunks gerados:
 *   vendor-react   → react + react-dom (~130KB gzip)
 *   vendor-lucide  → lucide-react (~90KB gzip, tree-shaken pelo Vite)
 *   index          → código da aplicação (~20KB gzip)
 *
 * Resultado: carregamento paralelo + cache granular por chunk
 * (trocar versão do app não invalida o cache do React/Lucide).
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom'],
          'vendor-lucide': ['lucide-react'],
        },
      },
    },
    // Aumenta o limiar do warning para 600KB
    // (lucide tree-shaken fica ~180KB minificado — abaixo disso)
    chunkSizeWarningLimit: 600,
  },
});
