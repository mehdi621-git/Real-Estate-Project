import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/server':{
       target: "http://localhost:3000",
      secure:false,
      },
    },
    headers: {
    'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
  }
  },
  plugins: [react()],
})
