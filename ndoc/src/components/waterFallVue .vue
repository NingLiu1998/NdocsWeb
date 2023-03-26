<template>
    <div class="wraps">
        <div :style="{ height: item.height + 'px', background: item.background, top: item.top + 'px', left: item.left + 'px' }"
            v-for="item in waterList" class="items">
            {{ item.title }}
        </div>
    </div>
</template>
 
<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
const props = defineProps<{
    list: any[]
}>()
const waterList = reactive<any[]>([])
const init = () => {
    const heightList: any[] = []
    const width = 160;
    const x = document.body.clientWidth
    const column = Math.floor(x / width)

    for (let i = 0; i < props.list.length; i++) {
        if (i < column) {
            props.list[i].top = 5;
            props.list[i].left = i * (width - 5);
            heightList.push(props.list[i].height + 5)
            waterList.push(props.list[i])
        } else {
            let current = heightList[0]
            let index = 0;
            heightList.forEach((h, inx) => {
                if (current > h) {
                    current = h;
                    index = inx;
                }
            })
            props.list[i].top = (current + 5);
            props.list[i].left = index * (width - 5);
            heightList[index] = (heightList[index] + props.list[i].height + 5);
            waterList.push(props.list[i])

        }
    }
    console.log(props.list)
}

onMounted(() => {
    window.onresize = () => init()
    init()
})

</script>
 
<style scoped lang='scss'>
.wraps {
    position: relative;
    height: 100%;

    .items {
        position: absolute;
        width: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: bold;
        transition: all .3s;
        cursor: pointer;
        transform: scale(1);

        &:hover {
            box-shadow: 1px 1px 10px 2px rgba(50, 49, 48,.5);
            transform: scale(1.1);
            z-index: 100;
        }
    }
}
</style>