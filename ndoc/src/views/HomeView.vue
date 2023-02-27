<template>
  <main>
    <div class="content">
      <h1>Proletarier aller Länder, vereinigt euch!</h1>
      <h5>Aufhebung des Privateigentums</h5>
      <el-row class="btns">
        <p>网络曾用名：宁骑（编程圈）/CTU（游戏圈）/新田（ACGN圈），家里有两只猫，码龄~八年，B/S 方向</p>
        <p>热衷免费参与和开发各种以非盈利为最终目的大大小小项目</p>
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
  display: flex;
  align-items: center;
  flex-direction: column;


  .projects {
    margin: 1vh 0;
    display: flex;
    justify-items: center;
    align-items: center;
    gap: 1vh;

    &-item {
      border: .5vh solid var(--color2);
      min-width: 15vh;
      padding: 1vh;
      border-radius: 1vh;
      text-align: center;
    }

  }

  .content {
    width: 100%;
    display: flex;
    align-items: center;
    // background: var(--color1);
    color: var(--color2);
    justify-content: space-evenly;
    font-size: 2.5vh;
    flex-direction: column;
    flex-wrap: nowrap;
    border-radius: 1vh;

    .btns {
      margin: 5vh 0;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
}
</style>
