import { copyFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const isBranchPagesBuild = mode === 'pages'
  const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'IAP-Veracruz'
  const base = isBranchPagesBuild
    ? `/${repositoryName}/`
    : process.env.GITHUB_ACTIONS === 'true' && !repositoryName.endsWith('.github.io')
      ? `/${repositoryName}/`
      : '/'

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
    plugins: [vue(), ...(isBranchPagesBuild ? [pagesFallbackPlugin] : [])],
  }
})
