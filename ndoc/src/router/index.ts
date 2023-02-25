import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
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
        { path: '/start', name: '编程单元', component: () => import('../views/program/start.vue') },
        { path: '/imView', name: '编程单元', component: () => import('../views/program/imView.vue') },
        { path: '/write', name: '写', component: () => import('../views/program/write.vue') },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  //在跳转路由之前，先清除所有的请求
  // clearPending()
  // ...
  next()
})


export default router
