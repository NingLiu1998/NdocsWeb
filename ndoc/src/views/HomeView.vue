<template>
  <main>
    <div class="slides">
      <h1>Proletarier aller Länder, vereinigt euch!</h1>
      <h5>Aufhebung des Privateigentums</h5>
      <el-row class="btns">
        <p>信息：宁骑，开发者，现年25</p>
        <p>后端：Csharp,wpf,dotNet,rust,golang,java,nodejs,python</p>
        <p>前端：Vue3,Vite,Typescript,react</p>
        <p>业余：[unity3d] [骑砍一服务端开发] [骑砍二模组开发] [Mineccraft插件/服务器官网开发] [针对游戏进行QQ机器人开发]</p>
        <p>爱好：参与兴趣开发，养猫，养狗，Bilibili</p>
        <p></p>
      </el-row>
      <div class="projects">
        <div class="projects-item">
          网站收纳
        </div>
        <div class="projects-item">
          私有B站
        </div>
        <div class="projects-item">
          系统模拟
        </div>
      </div>
    </div>
    <div class="slides">
      测试
    </div>

  </main>
</template>
<script setup lang="ts">
import { ref } from 'vue'

</script>

<style lang="scss" scoped>
body {
  // background: #800020;
}

main {
  // display: flex;
  // align-items: center;
  // flex-direction: column;
  transition: all .5s;

  .projects {
    margin: 1vh 0;
    display: flex;
    justify-items: center;
    align-items: center;
    gap: 1vh;

    &-item {
      cursor: pointer;
      border: .5vh solid var(--color2);
      min-width: 15vh;
      padding: 1vh;
      border-radius: 1vh;
      text-align: center;
      transition: all .5s;

      &:hover {
        border: .5vh solid var(--color2);
        color: var(--color1);
        background: var(--color2);
      }
    }

  }

  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  height: 100vh;

  .slides {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    color: var(--color2);
    justify-content: center;
    font-size: 2.5vh;
    flex-direction: column;
    flex-wrap: nowrap;
    // border-radius: 1vh;
    scroll-snap-align: start;
    // background: linear-gradient(454deg, var(--color2), var(--color1));
    background: var(--color1);
    transition: all .5s;

    .btns {
      margin: 5vh 0;
      display: flex;
      align-items: left;
      flex-direction: column;
    }
  }
}
</style>
