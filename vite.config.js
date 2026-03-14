import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// REPO-NAME: exakt wie auf github.com/rentallin/___
const REPO_NAME = 'elterngeld_training'

export default defineConfig({
  plugins: [react()],
  base: `/${REPO_NAME}/`,
  build: {
    outDir: 'dist',
  }
})
