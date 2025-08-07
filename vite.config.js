import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      proxy: {
        '/api': {
          target: 'https://port-8080-shoppingmall-mdsn9zf153ba9c89.sel5.cloudtype.app',
          changeOrigin: true,
          secure: false,
        },
      },
    },
})