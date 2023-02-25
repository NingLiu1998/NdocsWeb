import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'



const fs = require('fs')
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  // server: {
  //   open: true,
  //   host: "0.0.0.0",
  //   port: 5173,
  //   cors:true
  //   // proxy: {
  //   //   "/api": {
  //   //     target: "http://localhost:8087", // 后台接口
  //   //     changeOrigin: true,
  //   //     secure: false, // 如果是https接口，需要配置这个参数
  //   //     // ws: true, //websocket支持
  //   //     //rewrite: (path) => path.replace(/^\/api/, ""),
  //   //   },
  //   // },

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
