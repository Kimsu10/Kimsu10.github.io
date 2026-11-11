import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// Set VITE_BASE to /YOUR_REPOSITORY_NAME/ for GitHub project pages.
export default defineConfig({ plugins: [vue()], base: process.env.VITE_BASE || '/' })
