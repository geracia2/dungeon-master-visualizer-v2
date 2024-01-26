import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    '/auth': `http://localhost:${process.env.PORT}`,
    '/api': `http://localhost${process.env.PORT}`
  }
})
