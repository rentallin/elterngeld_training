import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ WICHTIG: Hier den Namen deines GitHub-Repos eintragen
// Beispiel: Repo heißt "elterngeld-training" → base: '/elterngeld_training/'
// Wenn du eine eigene Domain nutzt: base: '/'
const REPO_NAME = 'elterngeld-training'

export default defineConfig({
  plugins: [react()],
  base: `/${REPO_NAME}/`,
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  }
})
