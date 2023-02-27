<template>
    <div class="common-layout">
        <el-container>
            <el-header height="100%">
                <NavigationMenu @changeMenu="changeMenu" :level="1" :menus="menus" />
            </el-header>
            <el-container>
                <el-main>
                    <Suspense>
                        <template #default>
                            <component :is="comId" />
                        </template>

                        <template #fallback>
                            <el-skeleton :rows="5" animated />
                        </template>
                    </Suspense>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, reactive, getCurrentInstance, defineAsyncComponent, shallowRef, markRaw } from 'vue';
import NavigationMenu from '../../components/Nav/NavigationMenu.vue'
import type NavigationSideMenu from '../../components/Nav/NavigationSideMenu.vue'
import { api } from "../../utils/http"
import { u } from '@/utils/util';
onMounted(() => {
})
//所有编程相关的页面组件,TODO:后期遍历导入
// import imView from './imView.vue';
// import start from './start.vue';

const imView = defineAsyncComponent(() => import('./imView.vue'));
const startView = defineAsyncComponent(() => import('./start.vue'));
const writeVue = defineAsyncComponent(() => import('./write.vue'));

const commponentMap: any = {
    "startView": markRaw(startView),
    "imView": markRaw(imView),
    "writeVue": markRaw(writeVue)
};

const comId = shallowRef(startView);

//切换页面组件
const changeMenu = (com: string) => {

    if (!commponentMap[com]) {
        u.NoticeNo('这个页面还在开发中，敬请期待···');
    } else {
        comId.value = commponentMap[com];
        console.log(com)
    }

    //


}

//菜单导航数据
const menus = reactive([
    {
        name: '编程',
        com: 'startView',
    },
    { name: "写作", com: 'writeVue' },
    {
        name: "Csharp",
        com: 'writeVue',
        children: [
            {
                name: ".Net",
                isChildren: true,
                children: [
                    { name: "笔记" },
                    { name: "实例展示", children: [{ name: 'IM', com: 'imView' }] }

                ]
            },
            {
                name: "WPF"
            }
        ]
    }
])

//侧边栏导航数据
const sideMuens = reactive([

    {
        name: "menu1",
        index: "1",
        icon: "Fold",
        children: [
            { name: "menu1-1", icon: "memo" },
            { name: "menu1-2", icon: "memo", },
            {
                name: "menu1-3", icon: "Fold", children: [
                    { name: "menu-3-1", icon: "memo", },
                    {
                        name: "menu-3-2", icon: "Fold", children: [
                            { name: "menu-3-2-1", icon: "memo" },
                            { name: "menu-3-2-2", icon: "memo" },
                            { name: "menu-3-2-3", icon: "memo" },
                        ]
                    },
                ]
            },

        ]
    },
    {
        name: "menu2",
        icon: "memo",
        children: []
    },
    {
        name: "menu3",
        icon: "memo",
        children: []
    }

]);


const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>
<style scoped lang='scss'>
.el-header {
    // --el-header-padding: 0;
}
</style>