import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000'
    },
    host: '0.0.0.0',
  },
  build: {
    rollupOptions: {
      output:{
        manualChunks(id) {
          if (id.match('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
        }
        }
      }
    }
  },
  plugins: [react()],
})
