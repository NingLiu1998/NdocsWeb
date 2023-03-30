import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'


const fs = require('fs')
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      // 全局引入了 scss 的文件
      scss: {
        // 添加你的全局共享scss文件
        additionalData: ``,
        javascriptEnabled: true,
      },
    },
    postcss: {
    },
  },
  plugins: [
    vue({
      // 默认开启响应性语法糖
      reactivityTransform: true
    }), vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    Unocss()
  ],
  server: {
    open: true,
    host: "0.0.0.0",
    port: 5173,
    cors: true,
    proxy: {
      "/api": {
        target: "https://www.fastmock.site/mock/577791f057d5814505a1d341350ed7e3", // 后台接口
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
      },
      "/github-api": {
        target: "https://api.github.com", // github
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        rewrite(path) {
          return path.replace(/^\/github-api/, "")
        },
      }
    }
  },

  //   // https: {
  //   //   // 主要是下面两行的配置文件，不要忘记引入 fs 和 path 两个对象
  //   //   cert: fs.readFileSync(path.join(__dirname, 'src/build/cert/ca.pem')),
  //   //   key: fs.readFileSync(path.join(__dirname, 'src/build/cert/ca.key'))
  //   // }
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
