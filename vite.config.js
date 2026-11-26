import { copyFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const PRODUCTION_CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  'frame-src https://maps.google.com https://www.google.com',
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

export default defineConfig(({ mode }) => {
  const isBranchPagesBuild = mode === 'pages'
  const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'IAP-Veracruz'
  const base = isBranchPagesBuild
    ? `/${repositoryName}/`
    : process.env.GITHUB_ACTIONS === 'true' && !repositoryName.endsWith('.github.io')
      ? `/${repositoryName}/`
      : '/'

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

  const pagesFallbackPlugin = {
    name: 'github-pages-branch-fallback',
    closeBundle() {
      const outputDirectory = resolve(process.cwd(), 'docs')
      copyFileSync(resolve(outputDirectory, 'index.html'), resolve(outputDirectory, '404.html'))
      writeFileSync(resolve(outputDirectory, '.nojekyll'), '')
    },
  }

  return {
    base,
    build: isBranchPagesBuild ? { outDir: 'docs' } : undefined,
    plugins: [
      vue(),
      productionSecurityHeadersPlugin,
      ...(isBranchPagesBuild ? [pagesFallbackPlugin] : []),
    ],
  }
})
