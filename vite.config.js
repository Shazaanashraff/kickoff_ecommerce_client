import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  assetsInclude: ['**/*.mp4'],
  plugins: [
    tailwindcss(),
  ],
})