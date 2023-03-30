<script lang="ts" setup>
import { Menu as IconMenu, Message, Setting, Upload, Close, Check, View, Plus, Search } from '@element-plus/icons-vue'
import type { User, Setting as UploadSetting } from '@/model/github'
import type { UploadProps, UploadUserFile, CascaderProps, UploadRequestOptions } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getUser as GetUser, isImage, init, validCDN, replacePath } from '@/utils/github-user'
import { getReposContents, getUserRepos, upload, upload as uploadGithub, delFile } from '@/api/github'
import localCache from '@/utils/cache'
import type { Directive } from 'vue'
import { ref, reactive, onMounted, computed, watch } from 'vue'
import router from '@/router'
import { split } from 'lodash-es'
// 本地用户信息
const user: User = GetUser()
// 选择操作
const isSetting = ref('setting')
// 搜索加载
const searchLoading = ref(false)
// 级联菜单选择路径
const selectPath = ref('')

// 图片上传之前的配置信息
const uploadSetting = reactive<UploadSetting>({
    isCustomUrl: false,
    customId: 'uuid',
    uploadUrl: '',
    message: `upload a picture from ${new Date().toLocaleString()}`,
    isCDN: true,
    CDN: 'https://cdn.staticaly.com/gh',
    markdown: true,
    customCDN: ''
})


// 如果获取不到用户信息，请登录
onMounted(async () => {
    if (!user?.username) {
        ElMessageBox.confirm(
            '获取不到您的信息，请前往配置?',
            '未登录通知',
            {
                confirmButtonText: 'OK',
                showCancelButton: false,
                type: 'warning',
            }
        )
            .then(() => {
                router.replace('/github-login')
            })
            .catch(() => {
                router.replace('/github-login')
            })
        return;

    }
    // 初始化表单信息 
    const localInfo = localCache.getCache(forminfo)
    const s1 = localCache.getCache(localPath)
    init(uploadSetting, localInfo)
    // 用户登录 从仓库中获取仓库类型信息
    selectPath.value = s1.split('/').filter(item => item)
    console.log(s1.split('/').filter(item => item))
    // selectPath.value = 
    setTimeout(() => {
        getUserRepo()
    }, 1000)
})


// 选择的路径
const realPath = computed(() => {
    let path = ''
    if (uploadSetting.isCustomUrl) {
        path = uploadSetting.uploadUrl + '/'
    } else {
        path = Object.values(selectPath.value).join('/') + '/'
    }
    localCache.setCache(localPath, replacePath(path))
    return replacePath(path)
})

// 可访问地址
const CDNAccessUrl = computed(() => {
    // 是否选择CDN 或者自定义CDN
    if (uploadSetting.isCDN) {
        return speedUrl.value(user?.username, uploadSetting.repo, uploadSetting.branch, realPath.value)
    } else {
        return replacePath(uploadSetting.customCDN as string)
    }
}
)

// 是否允许上传
const isPermissionUpload = computed(() => {
    return uploadSetting.repo && uploadSetting.branch && user?.username
})


// 通过CDN拼接生成可访问地址
const speedUrl = computed(() => {
    return (username: string, repo: string, branch: string = 'main', path: string) => {
        if (uploadSetting.isCDN) {
            return replacePath(`${uploadSetting.CDN}/${username}/${repo}@${branch}/${path}`)
        } else {
            return replacePath(`${uploadSetting.customCDN}/${username}/${repo}@${branch}/${path}`)
        }
    }

})

// 重置
const resetNode = () => {
    // 重置级联菜单
    options[0] = {
        value: '',
        label: '根路径',
        children: []
    }
}


const repoList: any[] = reactive([])
const getUserRepo = async () => {
    getUserRepos(user?.username as string).then(res => {
        if (Array.isArray(res)) {
            res.forEach(item => {
                repoList.push({
                    name: item.name,
                    gitUrl: item.git_url
                })
            })
        }
    })
}

interface RepoImg {
    name?: string
    url?: string
    gitUrl?: string
    htmlUrl?: string
    downloadUrl?: string
    sha?: string
    api?: string
    path?: string
    repo?: string
}



let imgList = ref<RepoImg[]>([])
// 是否开启递归查找
const isDef = ref(false)
const search = async () => {
    await searchImage(realPath.value)
}

const searchImage = async (path: string) => {
    searchLoading.value = true
    imgList.value = []
    getReposContents(user?.username as string, uploadSetting.repo as string, path).then(res => {
        if (Array.isArray(res)) {
            for (const result of res) {
                const { type, name, path, git_url, html_url, download_url, sha } = result
                if (type === 'dir' && isDef.value) {  // 进入递归查找
                    // searchImage(path)
                } else if (type === 'file' && isImage(name)) {
                    let r = {
                        'name': name,
                        'url': speedUrl.value(user?.username as string, uploadSetting.repo as string, uploadSetting.branch, path),
                        'gitUrl': git_url,
                        'htmlUrl': html_url,
                        'downloadUrl': download_url,
                        'sha': sha,
                        "path": path,
                        'repo': uploadSetting.repo
                    }
                    imgList.value.push(r)
                }

            }
            if (imgList.value.length == 0) {
                ElMessage({
                    type: 'warning',
                    message: '搜索内容为空！'
                })
            }
            else {
                ElMessage({
                    type: 'success',
                    message: `搜索到${imgList.value.length}条结果`
                })
            }
            console.log('搜索结果显示:', imgList.value.length);
        }
        searchLoading.value = false
    })
}

// 保存表单信息
const forminfo = 'info'
const saveInfo = () => {
    if (!uploadSetting.isCDN && !validCDN(uploadSetting.customCDN as string)) {
        ElMessage({
            message: '请输入有效CDN!',
            type: 'error',
        })
        return;
    }
    localCache.setCache(forminfo, uploadSetting)
    localCache.setCache(localPath, realPath.value)
    ElMessage({
        message: '表单信息保存成功!',
        type: 'success',
    })
}
const props: CascaderProps = {
    lazy: true,
    checkStrictly: true,
    async lazyLoad(node, resolve) {
        let list: any[] = []
        const { pathValues } = node
        let path = ''
        if (Array.isArray(pathValues)) {
            if (pathValues.length == 1) {
                path = '/'
            } else {
                path = pathValues.join('/')
            }
        }
        await loadingRepoContent(list, path, resolve)
    },
}


interface RepoInfo {
    value?: string
    label?: string
    children?: RepoInfo[]
}


let options = reactive<Array<RepoInfo>>([
    {
        value: '',
        label: '根路径',
    }
])

const loadingRepoContent = async (list: any[], path: string, resolve: any) => {
    getReposContents(user?.username as string, uploadSetting.repo as string, path).then(res => {
        console.log('res', res)
        if (Array.isArray(res)) {
            for (const result of res) {
                const { type, name } = result
                if (type === 'dir') {
                    list.push({
                        value: name,
                        label: name,
                        leaf: false,
                    })
                }
            }
            resolve(list)
        }
    })
}



// 文件上传部分
const dialogVisible = ref(false)
const dialogImageUrl = ref('')
const fileList = ref<UploadUserFile[]>([])
// 处理删除
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}


// 预览
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}


// 点击上传，检查是否能够上传
const uploadRef = ref<HTMLElement | null>()
const submit = () => {
    uploadRef?.value?.submit()
}


// 自动上传钩子，覆盖默认上传方式
// https://element-plus.gitee.io/zh-CN/component/upload.html#%E5%B1%9E%E6%80%A7
const submitUpload = (uploadOptions: UploadRequestOptions) => {
    let fileReader = new FileReader()
    fileReader.readAsDataURL(uploadOptions.file)
    fileReader.onload = () => {
        let base64 = fileReader.result as string
        base64 = base64.split(',')[1]
        // 是否是自定义名称
        let fileName = uploadOptions.file?.name as string
        if (uploadSetting.customId == 'uuid') {
            fileName = window.crypto.randomUUID() + fileName.substr(fileName.lastIndexOf('.'))
        }
        uploadToGithub(base64, fileName)
    }
}

// 上传至github
let historyList = reactive<Array<RepoImg>>([])
let cache = [] as RepoImg[]
const localImageKey = "Local_image_key"
const localPath = "Local_path"

onMounted(() => {
    cache = localCache.getCache(localImageKey)
    if (cache && Array.isArray(cache)) {
        cache.forEach(item => {
            historyList.push(item)
        })
    }
    else {
        cache = []
    }
})



const isLoadingUpload = ref(false)

const uploadToGithub = (content: string, fileName: string) => {
    const data = {
        branch: uploadSetting?.branch || '',
        content: content,
        message: `${uploadSetting.message} 上传了 ${fileName}`
    }
    // if (!null) {
    //     return;
    // }
    isLoadingUpload.value = true

    uploadGithub(user?.username as string, uploadSetting.repo as string, realPath.value as string, fileName, data).then(res => {
        // console.log(res)
        isLoadingUpload.value = false
        // 如果图片上传成功保存到历史记录中
        // 生成可访问的地址
        let { content } = res
        if (!content) {
            return;
        }
        let item: RepoImg = {
            name: content.name,
            sha: content.sha,
            path: replacePath(realPath.value + '/' + fileName),
            gitUrl: content.url,
            repo: uploadSetting.repo,
            url: speedUrl.value(user?.username as string, uploadSetting.repo as string, uploadSetting.branch as string, content?.path)
        }

        historyList.push(item)
        cache.push(item)
        // 保存到本地
        localCache.setCache(localImageKey, cache)
        console.log('upload');
        console.log(historyList);
        ElMessage({
            type: 'success',
            message: '上传成功！'
        })
    }).catch(() => isLoadingUpload.value = false)
}



// 通过自定义指令开启懒加载模式
let vLazy: Directive<HTMLElement, any> = (el: HTMLImageElement, binding: any) => {
    const observer = new IntersectionObserver(entry => {
        if (entry[0].intersectionRatio > 0) {
            setTimeout(() => {
                el.src = binding.value
                // 当图片加载失败执行该事件
                el.addEventListener('error', () => {
                    el.src = 'https://cdn.staticaly.com/gh/wuxin0011/blog-resource@main/picgo/1020bdab-c5f4-48f7-b19a-fcb68caf80c5.png'
                })
                observer.unobserve(el)
            }, 200);
        }
    })
    observer.observe(el)
}



const toDetail = (url: string) => {
    window.open(url, "_blank")
}

const markdown = computed(() => (url: string) => uploadSetting.markdown ? `![](${url})` : url)

const toCopy = (url: string) => {
    // 使用浏览器原生api 拷贝
    navigator.clipboard.writeText(markdown.value(url)).then(() => {
        ElMessage({
            type: 'success',
            message: '复制成功！'
        })
    }).catch(() => {
        ElMessage({
            type: 'error',
            message: '复制失败!'
        })
    })
}


const toDelete = (item: RepoImg, index: number, type: string) => {
    // console.log('item', item)
    // if (true) {
    //     return;
    // }
    ElMessageBox.confirm(
        '删除远程仓库文件，该操作不可逆！确认删除?',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            let body = {
                sha: item?.sha,
                message: 'delete file' + item?.path,
                branch: uploadSetting?.branch
            }
            delFile(user.username, item.repo, item.path, body).then(res => {
                // 如果删除成功会返回提交的消息
                if (res?.commit?.message) {
                    if (type == 'history') {
                        historyList.splice(index, 1)
                    }
                    if (type == 'search') {
                        imgList.value.splice(index, 1)
                    }
                    ElMessage({
                        type: 'success',
                        message: '删除成功！',
                    })
                }

            })

        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '操作已取消！',
            })
        })
}


const deleteCache = (item: RepoImg, index: number, type: string) => {
    ElMessageBox.confirm(
        '该操作不可恢复，确认删除?',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'error',
        }
    )
        .then(() => {
            if (type == 'history') {
                historyList.splice(index, 1)
                // 更新本地缓存
                localCache.setCache(localImageKey, historyList)
            }
            if (type == 'search') {
                imgList.value.splice(index, 1)
            }
        })
        .catch((err) => {
            ElMessage({
                type: 'info',
                message: err || '操作已取消！',
            })
        })
}



</script>


<template>
    <el-container class="layout-container-demo" style="height: 600px">
        <el-aside width="150px">
            <el-row justify="center" class="mt-20">
                <el-button :icon="Setting" type="primary" @click="isSetting = 'setting'">配置</el-button>
            </el-row>
            <el-row justify="center" class="my-10">
                <el-button :icon="Upload" type="primary" @click="dialogVisible = true"
                    :disabled="!isPermissionUpload">上传</el-button>
            </el-row>
            <el-row justify="center" class="my-10">
                <el-button :icon="View" type="primary" @click="isSetting = 'views'">记录</el-button>
            </el-row>
            <el-row justify="center" class="my-10">
                <el-button :icon="Close" type="primary" @click="$router.push('/github-login')">退出</el-button>
            </el-row>
        </el-aside>
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <div class="toolbar">
                    <el-dropdown>
                        <el-icon style="margin-right: 8px; margin-top: 1px">
                            <setting />
                        </el-icon>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>
                                    <router-link to="/">退出</router-link>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <a :href="`https://github.com/${user?.username}`" target="_blank"><el-avatar :src="user?.avatar"
                            class="cursor-pointer "></el-avatar></a>
                </div>
            </el-header>

            <el-main>
                <el-row v-if="isSetting == 'setting'">
                    <el-col :xs="24" :sm="12" :md="8">
                        <el-form class="inline-block" label-width="100" label-position="left" :model="uploadSetting">
                            <el-form-item label="仓库">
                                <el-select placeholder="请选择一个仓库..." class="w-full" v-model="uploadSetting.repo"
                                    @change="resetNode">
                                    <el-option class="w-full" :label="item.name" :value="item.name" v-for="item in repoList"
                                        :key="item.name"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="分支">
                                <el-input class="w-full" placeholder="main" v-model="uploadSetting.branch" />
                            </el-form-item>
                            <el-form-item label="自定义">
                                <el-tooltip content="自定义文件上传路径" :show-after="1000">
                                    <el-switch v-model="uploadSetting.isCustomUrl"></el-switch>
                                </el-tooltip>
                            </el-form-item>
                            <el-form-item label="路径">
                                <el-cascader class="w-3/6" style="width:60%;" :options="options" :props="props"
                                    v-model:model-value="selectPath" :disabled="!uploadSetting.repo"
                                    v-if="!uploadSetting.isCustomUrl"></el-cascader>
                                <el-input class="w-3/6" style="width:60%;" v-model="uploadSetting.uploadUrl" v-else
                                    placeholder="自定义路径 例如 a/b/c"></el-input>
                                <el-button style="width:30%;" class="w-2/6 ml-1" type="primary" :icon="Search"
                                    @click="search" :loading="searchLoading">搜索</el-button>
                            </el-form-item>
                            <el-form-item label="ID">
                                <el-radio-group v-model="uploadSetting.customId">
                                    <el-radio label="uuid" name="id" model-value="uuid"></el-radio>
                                    <el-radio label="imgName" name="id" model-value="imgName"></el-radio>
                                </el-radio-group>

                            </el-form-item>
                            <el-form-item label="markdown">
                                <el-tooltip content="复制图片格式为markdown" :show-after="500">
                                    <el-switch v-model="uploadSetting.markdown"></el-switch>
                                </el-tooltip>
                            </el-form-item>
                            <el-form-item label="CDN">
                                <el-tooltip content="图片访问加速" :show-after="1000">
                                    <el-switch v-model="uploadSetting.isCDN"></el-switch>
                                </el-tooltip>
                            </el-form-item>
                            <el-form-item label="CDN地址">
                                <el-select placeholder="选择一个CDN" class="w-full" v-model="uploadSetting.CDN"
                                    v-if="uploadSetting.isCDN" :disabled="!uploadSetting.isCDN">
                                    <el-option label="https://cdn.jsdelivr.net/gh"
                                        value="https://cdn.jsdelivr.net/gh"></el-option>
                                    <el-option label="https://cdn.staticaly.com/gh"
                                        value="https://cdn.staticaly.com/gh"></el-option>
                                </el-select>
                                <el-input v-else v-model="uploadSetting.customCDN" placeholder="请输入自定义CDN"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="提交消息格式 ..." v-model="uploadSetting.message" type="textarea" min="1"
                                    maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" :icon="Check" @click="saveInfo">保存</el-button>
                                <el-button type="info" :icon="Close">清空</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>

                    <!-- 图片内容加载区域 -->
                    <el-col :xs="24" :sm="20" :md="16" class="p-2">
                        <el-row v-if="imgList && imgList.length > 0">
                            <el-col :xs="24" :sm="12" :md="10" v-for="(item, index) in imgList" :key="item.name"
                                class="img-container">
                                <img v-lazy="item.url" onerror="this.src='/error.jpg'" />
                                <div class="button">
                                    <el-button type="primary" plain size="small" @click="toDetail(item.url)">查看</el-button>
                                    <el-button type="success" plain size="small" @click="toCopy(item.url)">复制</el-button>
                                    <el-button type="danger" plain size="small"
                                        @click="toDelete(item, index, 'search')">删除</el-button>

                                </div>
                            </el-col>
                        </el-row>
                        <el-row v-else v-loading="searchLoading">
                            <el-empty :image-size="200" class="w-full h-full" description="无内容" />
                        </el-row>
                    </el-col>
                </el-row>
                <el-row v-if="isSetting == 'views'">
                    <div class="img-container" v-for="(item, index) in historyList" :key="item.sha">
                        <img v-lazy="item.url" onerror="this.src='/error.jpg'" />
                        <div class="button">
                            <el-button type="primary" plain size="small" @click="toDetail(item?.url)">查看</el-button>
                            <el-button type="success" plain size="small" @click="toCopy(item?.url)">复制</el-button>
                            <el-button type="warning" plain size="small"
                                @click="deleteCache(item, index, 'history')">删除缓存</el-button>
                            <el-button type="danger" plain size="small"
                                @click="toDelete(item, index, 'history')">删除</el-button>
                        </div>
                    </div>
                </el-row>
            </el-main>
        </el-container>
    </el-container>

    <!--上传区域 -->
    <el-dialog v-model="dialogVisible" title="图片上传" width="80%" class="w-1/2" style="position:relative">
        <template #default>
            <el-upload ref="uploadRef" v-model:file-list="fileList" action="" list-type="picture-card"
                :http-request="submitUpload" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                :auto-upload="false">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <div class="mt-5 pb-5">
                <div class="m-0 mb-1 float-left" v-if="uploadSetting.isCDN">
                    <span>当前图片上传之后访问路径:</span>
                    <el-tag class="p-2 " type="success">{{ `${CDNAccessUrl}` + `文件名` }}</el-tag>
                </div>
                <div class="float-right">
                    <el-button @click="submit" :icon="Upload" :loading="isLoadingUpload">确认上传</el-button>
                    <el-button @click="dialogVisible = false" type="info">取消</el-button>
                </div>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped>
.layout-container-demo .el-menu {
    border-right: none;
}

.layout-container-demo .el-main {
    padding: 0;
}

.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
    position: sticky;
}





.dialog-footer button:first-child {
    margin-right: 10px;
}


.upload .el-tag {
    margin-bottom: 20px;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    text-align: center;
    padding: 20px;
}

.setting-container {
    margin-top: 20px;
}


a {
    text-decoration: none !important;
}

.img-container {
    position: relative;
    display: inline-block;
    background: rgba(0, 0, 0, 0.0);
    width: 300px;
    height: 300px;
    margin: 3px;
}

.img-container img {
    display: inline-block;
    z-index: -1;
    width: 100%;
    height: 100%;
    /* display: none; */
}

.img-container .button {
    position: absolute;
    width: 100%;
    height: 50px;
    z-index: 0;
    background: rgba(0, 0, 0, 0.05);
    bottom: 0;
    right: 0;
    left: 0;
    transition: 0.4s ease-in-out all;
    opacity: 0;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    vertical-align: middle;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
}

.img-container:hover .button {
    opacity: 1;
}
</style>