<template>
    <div>
        <el-aside width="200px">
            <el-menu active-text-color="#ffd04b" default-active="1">
                <div v-for="(sideItem, i) in sideMuens">
                    <div v-if="(sideItem?.children as SideMenuItem[])?.length > 0">
                        <sideMenuItem :first-icon="sideItem.icon" :menus="sideItem" :first-index="`${i}`" />
                    </div>
                    <div v-else>
                        <el-menu-item :index="`${i}`">
                            <!-- <template #title>
                                <el-icon>
                                    <component :is="sideItem.icon" />
                                </el-icon>
                                <span>{{ sideItem.name }}</span>
                            </template> -->

                            <el-icon>
                                <component :is="sideItem.icon" />
                            </el-icon>
                            <span>{{ sideItem.name }}</span>
                        </el-menu-item>
                    </div>
                </div>
            </el-menu>
        </el-aside>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, reactive } from 'vue';
import type { SideMenuItem } from './NavTypes';
import sideMenuItem from './NavigationSideItem.vue';
onMounted(() => {
    //console.log('3.-组件挂载到页面之后执行-------onMounted')    
})


//入参
const props = defineProps<{
    sideMuens: SideMenuItem[]
}>();


</script>
<style scoped lang='scss'></style>