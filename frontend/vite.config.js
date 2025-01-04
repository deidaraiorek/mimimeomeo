import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      leaflet: 'leaflet/dist/leaflet.js',
    },
  },
  build: {
    rollupOptions: {
      external: ['leaflet/dist/leaflet.css'],
    },
  },
});
