import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import geminiHandler from './api/gemini.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY) {
    process.env.GEMINI_API_KEY = env.GEMINI_API_KEY
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'local-api-gemini',
        configureServer(server) {
          server.middlewares.use('/api/gemini', async (req, res) => {
            await geminiHandler(req, res)
          })
        },
      },
    ],
  }
})
