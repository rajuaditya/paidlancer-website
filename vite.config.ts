import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    assetsInlineLimit: 2048,
  },
  ssr: {
    noExternal: ['@fontsource-variable/archivo', '@fontsource-variable/inter', '@fontsource/instrument-serif'],
  },
});
