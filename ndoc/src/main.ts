import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import RequestService from './utils/request';
// import config from './config';
//全局样式
import "./assets/styles/base.scss"

//icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// app.use(config);
// app.provide('request', RequestService);

app.use(createPinia())
app.use(router)

app.mount('#app')
