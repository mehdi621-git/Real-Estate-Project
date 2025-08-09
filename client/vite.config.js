import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/server':{
       target: "http://backend:3000",
      secure:false,
	      rewrite: path => path.replace(/^\/server/, ''),
      },
    },
	 
    headers: {
    'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
  }
  },
  plugins: [react()],
})
