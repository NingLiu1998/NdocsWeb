<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, reactive } from 'vue'
//导入类型
import type { reqRegisterUserType, resMainMenuType } from '@/utils/types_api';
const drawer = ref(false);
const drawerB = ref(false);
const title = ref('导航');

//注册
const registerForm: reqRegisterUserType = reactive({

})


//主菜单 TOTD:改为请求api获取
const mainMenus: resMainMenuType[] = reactive([
  {
    title: "后台", url: "/", children: [
      { title: "菜单", url: "/" },
      { title: "分类", url: "/" },
      { title: "密码", url: "/" },
      { title: "websock", url: "/" },
    ]
  },
  { title: "编程", url: "/program/" },
  {
    title: "元宇宙", url: "/universe/", children: [
      { title: "喵星", url: "/universe/cat" },
      { title: "汪星", url: "/universe/dog" },
      { title: "繁星", url: "/universe/any" },
    ]
  }
]);

</script>

<template>
  <div class="html">
    <div class="rv">
      <nav>
        <div class="nav-menu" v-for="(m, i) in mainMenus">
          <RouterLink :to="m.url">{{ m.title }}</RouterLink>
        </div>
      </nav>
      <!-- <RouterView /> -->
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
  --mycolor-bgc: #Cad0ce;
  --mycolor-2: #444c4e;
  --mycolor-3: #93020b;

  --color1: #800020;
  --color2: #DCD2C6;
}

.html {
  .rv {
    //#DCD2C6;

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

      .nav-menu {
        background: var(--color2);
        color: var(--color1);
        border-radius: 1vh;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        font-size: 2vh;
        padding: 2vh 1.5vh;
        cursor: pointer;

        &:hover {
          // background: var(--color1);
          // background: #dcd2c678;
          color: #fff;
          opacity: .9;
        }
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
