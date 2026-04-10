import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Listen on all interfaces including admin.localhost
    allowedHosts: [
      'localhost',
      'admin.localhost',
      '127.0.0.1',
      'admin.127.0.0.1',
    ],
  },
})