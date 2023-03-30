<template>
    <div class="u">
        <!-- <img :src="bgc" alt="" srcset=""> -->
        <div class="u-card"
            style="background: url('https://cdn2.xintianyuehui.cn/picGo/2023202303010707276.jpeg');">
            <div class="u-item">圣</div>
            <div class="u-item">火</div>
        </div>
        <div class="u-card hy">
            <div class="u-item">皓</div>
            <div class="u-item">月</div>
        </div>
        <div class="u-card">
            <div class="u-item">繁</div>
            <div class="u-item">星</div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
onMounted(() => {
    //console.log('3.-组件挂载到页面之后执行-------onMounted')
})

</script>
<style scoped lang='scss'>
.u {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 5vh;
    min-height: 100vh;
    margin: 0 5vh;

    &-card {
        width: 30vh;
        background-image: url(https://cdn2.xintianyuehui.cn/picGo/2023202303010653002.jpeg);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 10vh;
        margin: 6vh 0;
        padding: 5vh 0;
        border-radius: 2.5vh;
        box-shadow: 0px 0px 14px 8px rgb(0 0 0 / 54%);
        transform: scale(1);
        transition: all 0.3s;
        height: 450px;
        cursor: pointer;

        &:hover{
            transform: scale(1.1);
        }

        .u-item {            
            color: #fff;
            font-size: 4vh;
            text-align: center;
            cursor: pointer;
            transition: all 0.5s;
            &:hover {
                transform: scale(1.2);
            }
        }
    }

    .hy {
        background: url(https://cdn2.xintianyuehui.cn/picGo/2023202303010708745.jpeg);
        background-position-x: -2vh;
        background-position-y: -7vh;
        background-size: 37vh;
        background-repeat: no-repeat;
    }
}
</style>