import { resolve } from 'path'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import pugPlugin from 'vite-plugin-pug'

const copyOptions = {
  targets: [
    {
      src: ['./assets/images/*'],
      dest: './assets/images',
    },
  ],
}

const pugOptions = {
  pretty: true,
  localImports: true,
}

const pugLocals = {
  baseUrl: './views',
  imgUrl: '/assets/images',
  $: {
    getDataPage(page) {
      const context = 'src/views'
      const dirname = resolve(process.cwd(), `${context}/${page}/data.json`)
      return require(dirname)
    },
  },
}

export default defineConfig({
  root: 'src',
  plugins: [pugPlugin(pugOptions, pugLocals), viteStaticCopy(copyOptions)],
  resolve: {
    alias: {
      // src
      '@': resolve(__dirname, 'src'),

      // js
      scripts: resolve(__dirname, 'src/js'),

      // scss
      styles: resolve(__dirname, 'src/scss'),

      // assets
      images: resolve(__dirname, 'src/assets/images'),
      fonts: resolve(__dirname, 'src/assets/fonts'),
    },
  },
  server: {
    host: '0.0.0.0',
  },
  css: {
    devSourcemap: true,
  },
  build: {
    outDir: resolve(__dirname, 'build'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
    },
  },
})
