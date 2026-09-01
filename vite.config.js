import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Allow all hosts for vite preview so DO App Platform ingress works
  // See: https://vite.dev/config/preview-options#preview-allowedhosts
  preview: {
    allowedHosts: true,
  },
})
