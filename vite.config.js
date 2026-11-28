import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const PRODUCTION_CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  'frame-src https://maps.google.com https://www.google.com',
  "connect-src 'self' https://script.google.com https://script.googleusercontent.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const productionSecurityHeadersPlugin = {
  name: 'production-security-headers',
  apply: 'build',
  transformIndexHtml() {
    return [
      {
        tag: 'meta',
        attrs: {
          'http-equiv': 'Content-Security-Policy',
          content: PRODUCTION_CSP,
        },
        injectTo: 'head-prepend',
      },
    ]
  },
}

export default defineConfig({
  base: '/',
  plugins: [vue(), productionSecurityHeadersPlugin],
})
