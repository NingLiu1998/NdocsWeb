<template>
    <el-sub-menu :index="firstIndex">
        <template #title>
            <el-icon>
                <component :is="firstIcon" />
            </el-icon>
            <span>{{ menus.name }}</span>
        </template>
        <div v-for="(item, i) in menus.children">
            <div v-if="item.children">
                <NavigationSideItem :first-icon="item.icon" :menus="item" :first-index="`${firstIndex}-${i}`" />
            </div>
            <div v-else>
                <el-menu-item :index="`${firstIndex}-${i}`">
                    <el-icon>
                        <component :is="item.icon" />
                    </el-icon>
                    <span> {{ item.name }}</span>
                </el-menu-item>
            </div>
        </div>
    </el-sub-menu>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import type { SideMenuItem } from './NavTypes';


//入参
const props = defineProps<{
    menus: SideMenuItem,
    firstIndex: string,
    firstIcon: any
}>();

</script>
<style scoped lang='scss'></style>