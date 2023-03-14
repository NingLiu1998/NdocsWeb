<!-- Antv X6 -->
<!-- 文档地址：https://x6.antv.antgroup.com/tutorial/about -->
<template>
    <div class="oper">
        <el-button type="success" @click="addNode('circle',1,1,80,80)">测试</el-button>
    </div>
    <div id="container"></div>
</template>

<script setup lang='ts'>
import { ref, onMounted, reactive } from 'vue';
import { Graph } from "@antv/x6";

onMounted(() => {
    initGraph();
})

let graph: Graph;

const initGraph = () => {

    graph = new Graph({
        container: (document.getElementById('container') as HTMLElement),//document.getElementById("container"),
        width: 800,
        height: 600,
        background: {
            color: "#F2F7FA",
        },
    });
}

const addNode = (shape: string, x: number, y: number, w: number, h: number) => {
    graph.addNode({
        shape: shape,
        x: x,
        y: y,
        width: w,
        height: h,
    });
}



</script>
<style scoped lang='scss'></style>