<template>
    <div>
        <el-menu default-active="1" :mode="level == 1 ? 'horizontal' : 'vertical'">
            <template v-for="(menu, index) in menus">
                <template v-if="menu.children">
                    <NavItem @changeMenu="changeMenu" :menu="menu" :index="`${index + 1}`" />
                </template>
                <div class="123" v-else @click="changeMenu(menu.com)">
                    <el-menu-item :index="`${index + 1}`">
                        {{ menu.name }}
                    </el-menu-item>
                </div>
            </template>
        </el-menu>
    </div>
</template>
  
<script setup lang="ts">
import { reactive } from 'vue';
import NavItem from './NavigationItem.vue';
import type { MenuItem } from './NavTypes';

//传过去
const emit = defineEmits(['changeMenu']);
const changeMenu = (com?: string) => {
    emit('changeMenu', com)
};


//接
const props = defineProps<{
    menus: MenuItem[],
    level: number
}>();

// const handleSelect = (key: string, keyPath: string[]) => {
//     console.log(key, keyPath);
// };

const state = reactive({
    mode: 'horizontal',
});

if (props.level == 1) {
    console.log("第一次递归")
}

</script>
  