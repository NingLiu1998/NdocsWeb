<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
import { getRouters } from './api/router';
//导入类型
import type { reqRegisterUserType, resMainMenuType } from '@/utils/types_api';
const drawer = ref(false);
const drawerB = ref(false);
const title = ref('导航');

//注册
const registerForm: reqRegisterUserType = reactive({})
const mainMenus: resMainMenuType[] = reactive([]);


onMounted(() => {
  getRouters().then(res  => {
    if (Array.isArray(res)) {
      mainMenus.push(...res)
    }
  })
})


</script>

<template>
  <div class="html">
    <div class="rv">
      <nav>
        <div class="nav-menu" v-for="(m, index) in mainMenus" :key="index">
          <RouterLink :to="m.url">{{ m.title }}</RouterLink>
        </div>
      </nav>
      <router-view v-slot="{ Component }">
        <transition>
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
    <!-- 从下弹出的菜单 -->
    <el-drawer v-model="drawerB" direction="btt">
      <div class="btMenu">
      </div>
    </el-drawer>

    <!-- 底部备案信息 -->
    <footer>
      <div class="beian">
        <div class="lunchbox"></div>
        <a href="https://beian.miit.gov.cn/">粤ICP备15112073号</a>
      </div>
    </footer>

  </div>
</template>

<style lang="scss">
:root {
  // --mycolor-bgc: #Cad0ce;
  // --mycolor-2: #444c4e;
  // --mycolor-3: #93020b;
  // --color1: #800020;
  // --color2: #DCD2C6;
  --color-bgc: #F5F5F5;
  --color-menu: rgba(64, 158, 255, 0.8);
  --color-card: #BBDEFB;
  --color-text: #000000;
  --color-subText: #9E9E9E;
  --color-sub2Text: #DCD2C6;
  --color-power: #800020;

  // hover css
  --color-menu-hover: rgba(64, 158, 255, 1);
}

.html {
  .rv {
    nav {
      display: flex;
      gap: 5vh;
      margin-bottom: 5vh;
      flex-direction: column;
      position: fixed;
      right: 0;
      top: 5vh;
      z-index: 20;
      align-content: flex-end;
      padding: 1vh;
      padding-right: 0;

      .nav-menu {
        color: #fff;
        border-radius: 1vh;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        font-size: 2vh;
        padding: 1vh 2vh;
        cursor: pointer;
        position: relative;
        text-align: center;
        display: inline-flex;
        justify-content: center;
        background-color: var(--color-menu);

        a {
          text-decoration: none;
        }
      }

      .nav-menu:hover {
        background-color: var(--color-menu-hover);
      }
    }
  }

  footer {
    position: fixed;
    bottom: 1vh;

    .beian {
      display: flex;
      align-items: center;
      gap: 1vh;
      margin: 1vh .5vh;
      font-size: 0.16vh;

      .lunchbox {
        width: 5vh;
        height: 5vh;
        background: linear-gradient(45deg, #000, #4a4a4a);
        border-radius: 10px;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        position: relative;
        overflow: hidden;
      }

      .lunchbox:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: linear-gradient(0deg, rgba(255, 0, 0, 0.3), rgba(0, 255, 0, 0.3), rgba(0, 0, 255, 0.3), rgba(255, 255, 0, 0.3), rgba(255, 0, 255, 0.3));
        transform: skewX(-45deg);
        transform-origin: 0 100%;
      }

      .lunchbox:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 50%;
        top: 0;
        left: 0;
        background: linear-gradient(180deg, rgba(255, 0, 0, 0.3), rgba(0, 255, 0, 0.3), rgba(0, 0, 255, 0.3), rgba(255, 255, 0, 0.3), rgba(255, 0, 255, 0.3));
        transform: skewY(-45deg);
        transform-origin: 100% 0;
      }

    }
  }
}
</style>
