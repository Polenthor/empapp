import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true, // Allows the localtunnel URL
    hmr: {
      clientPort: 443, // Forces HMR to use the secure tunnel port
    },
  }
})
