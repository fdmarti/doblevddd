import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@common': fileURLToPath(new URL('./src/modules/common', import.meta.url)),
      '@auth': fileURLToPath(new URL('./src/modules/auth', import.meta.url)),
      '@categorias': fileURLToPath(new URL('./src/modules/categorias', import.meta.url)),
      '@cotizacion': fileURLToPath(new URL('./src/modules/cotizacion', import.meta.url)),
      '@extras': fileURLToPath(new URL('./src/modules/extras', import.meta.url)),
      '@gastos': fileURLToPath(new URL('./src/modules/gastos', import.meta.url)),
      '@pedidos': fileURLToPath(new URL('./src/modules/pedidos', import.meta.url)),
      '@productos': fileURLToPath(new URL('./src/modules/productos', import.meta.url)),
      '@pagos': fileURLToPath(new URL('./src/modules/pagos', import.meta.url)),
    },
  },
});
