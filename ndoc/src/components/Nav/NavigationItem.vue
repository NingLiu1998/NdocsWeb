<template>
    <div>
        <el-sub-menu :index="index">
            <template #title>{{ menu.name }}</template>
            <div v-for="(item, itemIndex) in menu.children">
                <div v-if="item.children">
                    <NavigationItem @changeMenu="changeMenu" :menu="item" :index="`${itemIndex}`" />
                </div>
                <div v-else @click="changeMenu(item.com)">
                    <el-menu-item :index="index + '-' + itemIndex">{{ item.name }}</el-menu-item>
                </div>
            </div>
        </el-sub-menu>
    </div>
</template>
  
<script setup lang="ts">
import { reactive } from 'vue';
import type {MenuItem} from './NavTypes'


//传过去
const emit = defineEmits(['changeMenu']);
const changeMenu = (com: string) => {
    emit('changeMenu', com)
};

const props = defineProps<{
    menu: MenuItem,
    index: string
}>();

const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};



</script>
  