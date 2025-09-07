import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Plugin to convert CSS links to preload for performance
const cssPreloadPlugin = () => ({
  name: 'css-preload',
  transformIndexHtml(html: string) {
    return html.replace(
      /<link rel="stylesheet"([^>]*?)href="([^"]*\.css)"([^>]*?)>/g,
      '<link rel="preload"$1href="$2"$3 as="style" onload="this.onload=null;this.rel=\'stylesheet\'"><noscript><link rel="stylesheet"$1href="$2"$3></noscript>'
    );
  }
});

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
    mode === 'production' && cssPreloadPlugin(),
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
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
}));
