<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, reactive } from 'vue'
//导入类型
import type { registerModel } from '@/utils/types';
const drawer = ref(false);
const drawerB = ref(false);
const title = ref('导航');

//注册
const registerForm:registerModel = reactive({
  
})
</script>

<template>
  <div class="content">
    <div class="rv">
      <RouterView />
    </div>
    <!-- 菜单按钮 -->

    <div class="btnMenu">
      <el-button type="primary" @click="drawer = drawer ? false : true">导航</el-button>
    </div>

    <!-- 主菜单 -->
    <el-drawer v-model="drawer" :title="title">
      <div class="menu">
        <div class="menu-item">
          <div class="menu-title">站点管理</div>
          <div class="menu-text">
            <router-link to="/program/write.vue" class="menu-text-item">写东西</router-link>
            <router-link to="/manager" class="menu-text-item">管理</router-link>
          </div>
        </div>

        <div class="menu-item" v-for="item in 8" :key="item">
          <!-- <div class="menu-title" @click="">编程</div> -->
          <a class="menu-title" href="/program/">编程</a>
          <div class="menu-text">
            <a class="menu-text-item" v-for="i in 5" :key="i">
              dotNet
            </a>
          </div>
        </div>
      </div>
    </el-drawer>

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

<style lang="scss" scoped>
.btnMenu {
  position: fixed;
  top: 1vh;
  right: 5vh;
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
  }
}


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

.menu {
  &-item {
    font-weight: bold;
    width: 100%;
    height: 100%;
    margin: 1vh auto;
    text-align: left;
    box-shadow: 0px 0px 3px #888888;
    background: linear-gradient(45deg, #FFB6C1, #BDFCC9);
    backface-visibility: hidden;
    cursor: pointer;
    padding: 1vh .5vh;
    display: flex;
    justify-items: center;
    align-items: center;
    gap: 1vh;
  }

  &-title {
    color: #fff;
    font-size: 2.5vh;
    flex-shrink: 0
  }

  &-text {
    font-size: 1.5vh;
    color: #fff;

    &-item {
      &:hover {
        background: linear-gradient(45deg, #ff7f50, #ff6a7f);
      }
    }
  }
}
</style>
