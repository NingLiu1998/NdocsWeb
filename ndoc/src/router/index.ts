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
      component: HomeView,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: '关于'
      }
    },
    {
      path: '/program',
      name: 'program',
      component: () => import('../views/program/index.vue'),
      children: [
        {
          path: 'start',
          name: '编程单元',
          component: () => import('../views/program/start.vue'),
          meta: {
            title: '编程单元'
          }
        },
        {
          path: 'imView',
          name: '编程单元',
          component: () => import('../views/program/imView.vue'),
          meta: {
            title: '编程单元'
          }
        },
        {
          path: 'write',
          name: '写',
          component: () => import('../views/program/write.vue'),
          meta: {
            title: '写'
          }
        },
        {
          path: 'codeView',
          name: '可视化逻辑',
          component: () => import('../views/program/codeView.vue'),
          meta: {
            title: '可视化逻辑'
          }
        },
      ]
    },
    {
      path: '/universe',
      name: '不一样的元宇宙',
      component: () => import('../views/universe/index.vue'),
      children: [
        {
          path: 'cat', name: '喵星',
          component: () => import('../views/universe/cat.vue'),
          meta: {
            title: '喵星'
          }
        },
        {
          path: 'dog', name: '汪星',
          component: () => import('../views/universe/dog.vue'),
          meta: {
            title: '汪星'
          }
        },
        {
          path: 'human',
          name: '繁星',
          component: () => import('../views/universe/dog.vue'),
          meta: {
            title: '繁星'
          }
        },
      ]
    },
    {
      path: '/403',
      name: 'Forbid',
      component: () => import('../views/error/403/index.vue'),
      meta: {
        title: '禁止访问',
        hidden: true
      }
    },
    {
      path: '/github-login',
      name: 'GithubLogin',
      component: () => import('../views/github/login.vue'),
      meta: {
        title: 'github认证',
        hidden: true
      }
    },
    {
      path: '/github',
      name: 'Github',
      component: () => import('../views/github/index.vue'),
      meta: {
        title: 'github文件上传',
        hidden: true
      }
    },
    {
      path: '/403',
      name: 'Forbid',
      component: () => import('../views/error/403/index.vue'),
      meta: {
        title: '禁止访问',
        hidden: true
      }
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('../views/error/404/index.vue'),
      meta: {
        title: '页面未找到！',
        hidden: true
      }
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  //在跳转路由之前，先清除所有的请求
  // clearPending()
  // ...
  NProgress.start(); // 开始加载指示器
  if (window?.document) {
    window.document.title = to?.meta?.title ? to?.meta?.title : ''
  }
  next()
})

router.afterEach(() => {
  NProgress.done(); // 完成加载指示器
});


export default router
