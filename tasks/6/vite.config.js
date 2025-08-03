import { defineConfig } from 'vite';

export default defineConfig({
    build: {
      minify: false,
      rollupOptions: {
        input: {
          entry: './src/entry.js',
          performance: './src/performance.js'
        },
        output: {
          entryFileNames: 'vite/[name].js'
        }
      },
    },
    output: 'dist'
})