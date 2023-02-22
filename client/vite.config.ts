import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteSvgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteSvgr(), react()],

  build: {
    outDir: 'dist',

    rollupOptions: {
      input: {
        main: './index.html',
        background: './src/background.ts',
      },

      output: {
        chunkFileNames: 'assets/[name].js',
        entryFileNames(chunkInfo) {

          // Conditional output path for multiple entry file one for main and one for background
          // This is needed so background.js can be compiled into dist root folder and main.js into assets folder
          // Without this all the files would be compiled into assets.
          if (chunkInfo.name === "main") return "assets/main.js"
          if (chunkInfo.name === "background") return "background.js"

        },
      }
    },
  },
})