import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto', // Injeta automaticamente o registro do service worker
      devOptions: {
        enabled: true, // PERMITE TESTAR O PWA NO MODO "YARN DEV"
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Nome do Seu App de Academia',
        short_name: 'AcademiaApp',
        description: 'Seu gerenciador de treinos inteligente',
        theme_color: '#000000', 
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/', // Garante que o app comece na raiz
        scope: '/',
        icons: [
          {
            src: 'icon192x192.png', // Verifique se o nome do arquivo na pasta /public é exatamente este
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});