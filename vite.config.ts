import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(), vueJsx()],
  build: { // 开发打包配置
    outDir: 'dist', // 打包输出目录
    sourcemap: true, // 生成sourcemap文件
    emptyOutDir: true, // 打包前清空输出目录
    // rollupOptions: {
    //   input: ['src/index.html']
    // }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
