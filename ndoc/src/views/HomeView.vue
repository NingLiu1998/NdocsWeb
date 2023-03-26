<template>
  <div class="block-area" ref="area">
    <waterFallVue :list="list"></waterFallVue>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, reactive, toRef, onBeforeMount } from 'vue';
import waterFallVue from '@/components/waterFallVue .vue';

interface StyleObject {
  height: number;
  width: number;
  background: string;
  title: string;
}

const list: StyleObject[] = reactive([]);

const getRandomNumber = (): number => {
  const min = 100;
  const max = 250;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}




//必须要再组件加载前执行
onBeforeMount(() => {
  for (let index = 0; index < 100; index++) {
    list.push({
      height: getRandomNumber(),
      width: getRandomNumber(),
      background: getRandomColor(),
      title: "空间"
    })

  }

})





// const divs = (el: HTMLElement) => {
//   // 断言为HTMLElement类型的数组
//   if (el)
//     (arrBlock.value as Array<HTMLElement>).push(el);
// };
</script>
<style scoped lang='scss'>
::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

.block-area {
  transition: all .5s;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  height: 100vh;
  scrollbar-width: none;
  scroll-behavior: smooth;
  // margin-left: 10vh;
  // display: flex;
  // align-items: center;
  // justify-content: center;
}
</style>