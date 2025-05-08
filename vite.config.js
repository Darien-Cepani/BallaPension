import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

// Get repository name for base path. 
// Ensures correct asset loading when deployed to a subdirectory on GitHub Pages (e.g., user.github.io/repo-name/).
const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';
const viteBase = process.env.NODE_ENV === 'production' && repoName ? `/${repoName}/` : '/';

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  base: viteBase,
  build: {
    outDir: 'dist' // Default output directory, matches your workflow
  },
  preview: {
    allowedHosts: ['2883-45-66-42-245.ngrok-free.app', 'localhost', '127.0.0.1']
  }
})
  