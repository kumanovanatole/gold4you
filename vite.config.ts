import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: '0.0.0.0',
    port: 5179,
    strictPort: true,
    proxy: {
      '/api/spot': {
        target: 'https://forex-data-feed.swissquote.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/spot/, '/public-quotes/bboquotes/instrument/XAU/EUR'),
      },
    },
  },
  preview: {
    port: 5179,
    strictPort: true,
    host: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
