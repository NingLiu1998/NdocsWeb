<template>
    <div class="md">
        <md-editor v-model="text" :noPrettier="true" />
        <div class="setting">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="标题">
                    <el-input v-model="formInline.user" placeholder="标题" />
                </el-form-item>
                <el-form-item label="分类">
                    <el-cascader v-model="optV" :options="opt" :props="props" @change="handleChange" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">发布</el-button>
                    <el-button type="primary" @click="onSubmit">草稿</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, reactive,toRaw } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
const text = ref('# Hello Editor');


const optV = ref([])
const handleChange = (value: any) => {
    console.log('Selected:',toRaw(value));
}
const props = {
    expandTrigger: 'hover' as const,
    checkStrictly: true
}
const opt = [{
    value: 't1',
    label: '测试',
    children: [{
        value: 'A1',
        label: 'A1',
        children: [{
            value: 'A1',
            label: 'A1',
        }]
    }]
},
{
    value: 't2',
    label: '测试2',
    children: [{
        value: 'A1',
        label: 'A1',
        children: [{
            value: 'A1',
            label: 'A1',
        }]
    }]
}]

const formInline = reactive({
    user: '',
    region: '',
})

const onSubmit = () => {
    console.log('submit!')
}

onMounted(() => {
    //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
</script>
<style scoped lang='scss'>
.md {
    margin: 10vh;

    .setting {
        margin-top: 2.5vh;
    }
}
</style>