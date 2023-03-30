<script lang="ts" setup>
import { getUser, init } from '@/utils/github-user'
import { userToken_key } from '@/model/github'
import type { User } from '@/model/github'
import { ref, onMounted, reactive, computed } from 'vue'
import { useUserStore } from '@/stores/github'
import type { FormRules, FormInstance } from 'element-plus'
import {
    Setting,
    Close,
    Select
} from '@element-plus/icons-vue'

const hub: User = {
    type: 'github',
    token: '',
    avatar: '',
    username: ''
}

const store = useUserStore()

const rules = reactive<FormRules>({
    token: [
        { required: true, message: '请输入token', trigger: 'blur' },
        { min: 10, message: 'token无效！', trigger: 'blur' },
    ]
})


const ruleFormRef = ref<FormInstance | null>(null)

const submitForm = async (form: FormInstance | undefined) => {
    if (!form) return
    form.validate((valid) => {
        if (valid) {
            store.getUserInfo(hub?.token as string)
        }
    })


}



const data = reactive(hub)

onMounted(() => {
    console.log('store', store)
    const user = getUser() as User
    init(data, user)
    init(store, user)
})
const clear = (form: FormInstance | undefined) => {
    store.clear()
    form.resetFields()
    init(hub, {})
    hub['type'] = 'github'
}


</script>

<template>
    <div class="github-container">
        <el-form class="github-login" ref="ruleFormRef" :rules="rules" :model="data" label-position="right"
            label-width="100">
            <el-form-item>
                <el-avatar :size="50" :src="store.avatar">
                </el-avatar>
                <el-link :underline="false" :type="`${store.username ? 'primary' : 'danger'}`">
                    {{ store.username ? store.username : '未配置' }}</el-link>
            </el-form-item>

            <el-form-item label="类型">
                <el-select v-model="data.type" placeholder="请选择你的仓库" class="w-full">
                    <el-option label="github" value="github" />
                    <el-tooltip content="Gitee暂时不支持外部网络访问，因此暂不开通">
                        <el-option label="gitee" value="gitee" disabled />
                    </el-tooltip>
                </el-select>
            </el-form-item>
            <el-form-item label="Token" prop="token">
                <el-input v-model="data.token" class="w-full" />
            </el-form-item>
            <el-form-item>
                <el-button @click="$router.push('/github')" :disabled="!store.username || !store.avatar" type="success">
                    登录
                </el-button>
                <el-button @click="submitForm(ruleFormRef)" type="primary" :icon="Setting" :loading="store.loading">
                    获取信息
                </el-button>
                <el-button @click="clear(ruleFormRef)" type="danger" :icon="Close">
                    清除
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-link
                    href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
                    target="_blank">什么是token?如何获取？</el-link>
            </el-form-item>

        </el-form>
    </div>
</template>


<style scoped>
.github-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center !important;
    align-items: center !important;
}

.github-login {
    /* border-radius: 1px solid red; */
    /* background: skyblue; */
    position: relative;
    padding: 1vh;
    width: 30%;
}

.el-avatar {
    margin-left: 60px;
}

.el-link {
    display: inline-block;
    margin: 0 10px;
    text-decoration: none;
}
</style>