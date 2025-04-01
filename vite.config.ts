import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path-browserify'; // Node.js yerine tarayıcı için uyarlanmış versiyon
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(),
  tailwindcss(),

  ],
  resolve: {
    alias: {
      '@': path.resolve('src'), // `__dirname` olmadan da çalışır
    },
  },
  server: {
    port: 5173,
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // "primary-color": "#1890ff",
        },
      },
    },
  },
});
