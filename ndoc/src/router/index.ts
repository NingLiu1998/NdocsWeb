import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NProgress from 'nprogress'

// import { clearPending } from "../utils/http";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/program',
      name: 'program',
      component: () => import('../views/program/index.vue'),
      children: [
        { path: 'start', name: '编程单元', component: () => import('../views/program/start.vue') },
        { path: 'imView', name: '编程单元', component: () => import('../views/program/imView.vue') },
        { path: 'write', name: '写', component: () => import('../views/program/write.vue') },
        { path: 'codeView', name: '可视化逻辑', component: () => import('../views/program/codeView.vue') },
      ]
    },
    {
      path: '/universe',
      name: '不一样的元宇宙',
      component: () => import('../views/universe/index.vue'),
      children: [
        { path: 'cat', name: '喵星', component: () => import('../views/universe/cat.vue') },
        { path: 'dog', name: '汪星', component: () => import('../views/universe/dog.vue') },
        { path: 'human', name: '繁星', component: () => import('../views/universe/dog.vue') },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  //在跳转路由之前，先清除所有的请求
  // clearPending()
  // ...
  NProgress.start(); // 开始加载指示器
  next()
})

router.afterEach(() => {
  NProgress.done(); // 完成加载指示器
});


export default router
