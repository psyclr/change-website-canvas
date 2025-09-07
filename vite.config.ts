import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Configure base path - use root for custom domain
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize for GitHub Pages
    outDir: 'dist',
    sourcemap: false,
    // Modern JavaScript build - avoid legacy JS for modern browsers
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries (самый важный chunk)
          vendor: ['react', 'react-dom'],
          
          // Routing (загружается только при навигации)
          router: ['react-router-dom'],
          
          // Большие библиотеки UI (можно загружать позже)
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-popover', '@radix-ui/react-tooltip'],
          
          // Интернационализация (загружается когда нужна смена языка)
          i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector', 'i18next-http-backend'],
        },
      },
    },
  },
}));
