import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  preview: {
    allowedHosts: ['2883-45-66-42-245.ngrok-free.app', 'localhost', '127.0.0.1']
  }
})
