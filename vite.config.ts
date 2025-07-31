import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'PlooginsWidget',
      fileName: (format) => `ploogins-widget.${format}.js`,
      formats: ['umd']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    },
    watch: {
      include: 'src/**',
      exclude: 'node_modules/**'
    }
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
