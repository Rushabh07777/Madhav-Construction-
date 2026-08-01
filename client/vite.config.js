import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      'nearest-retiree-gating.ngrok-free.dev',
      '.ngrok-free.dev'
    ]
  }
})