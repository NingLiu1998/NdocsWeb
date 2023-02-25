<template>
    <div>
        <el-row :gutter="12">
            <el-col :span="8">
                <el-card shadow="always">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-space fill>
                            <el-alert type="info" show-icon :closable="false">
                                <p>这个值会自己生成，你也可以通过注册来获取</p>
                            </el-alert>
                            <el-form-item label="websocketId">
                                <el-input v-model="wsClientId" placeholder="Ws客户端ID" />
                            </el-form-item>
                        </el-space>
                        <el-space fill>
                            <el-alert type="info" show-icon :closable="false">
                                <p>是否直接注册本网站账号,如果选中则直接通过websocketId为你注册一个账号</p>
                            </el-alert>
                            <el-form-item label="是否保留">
                                <el-switch v-model="isSaveWsId" />
                            </el-form-item>
                        </el-space>
                        <el-form-item>
                            <el-select v-model="currentChan" class="m-2" placeholder="Select">
                                <el-option v-for="item in lstChan" :key="item.name" :label="item.desc" :value="item.name" />
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button v-if="wsStatus == WsStatus.未连接" type="primary" @click="getWs">连接</el-button>
                            <el-button type="primary" @click="joinChan">加入选中群组</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <h5>当前群组：{{ currentChan }}</h5>
                    <div class="message">
                        <div class="message-item" v-for="(msg, i) in lstMessage" :key="i">
                            {{ msg.wsId }}
                            -----------
                            {{ msg.msg.content }}
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="never"> Never </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang='ts'>
import { Service } from '@element-plus/icons-vue';
import { ref, onMounted, reactive } from 'vue';
import { axios, service } from "../../utils/http"
import { u } from "../../utils/util"

enum WsStatus {
    未连接 = 1,
    已连接 = 2,
}

const lstChan = reactive([
    { name: 'qq', desc: "qq群内鬼" },
    { name: 'web', desc: "web聊天室" },
    { name: 'game', desc: "在线小游戏" },
]);

const wsClientId = ref("");
const wsStatus = ref(WsStatus.未连接);
const isSaveWsId = ref(false);
const currentChan = ref(lstChan[1].name);
const lstMessage = reactive([
    {
        name: "系统",
        wsId: "",
        chan: "",
        msg: {
            code: "text",
            content: "欢迎使用"
        }
    }
])



const getWs = () => {
    axios.get<any, string, any>('/api/im/ws-address/' + wsClientId.value,)
        .then(address => {
            console.log("地址", address);
            let websock = new WebSocket(address);
            // 客户端接收服务端数据时触发
            websock.onmessage = (e) => {
                u.NoticeOk(e.data, 'websocket 调试');
            }

            // 连接建立时触发
            websock.onopen = () => {
                u.NoticeOk('已建立websock连接');
                //默认加入web群组
                joinChan(lstChan[1].name);
                wsStatus.value = WsStatus.已连接;

                //判断是否需要注册账号
                if (isSaveWsId.value) {
                    service.register({ wsClientId: wsClientId.value });
                }
            }

            // 通信发生错误时触发
            websock.onerror = () => {
                u.NoticeNo('通讯由于异常终端');
                wsStatus.value = WsStatus.未连接;
            }

            // 连接关闭时触发
            websock.onclose = () => {
                u.NoticeNo('通讯已断开');
                wsStatus.value = WsStatus.未连接;
            }
        })

}

const getWsId = () => {
    //判断本地缓存
    let wsId = localStorage.getItem('wsId');
    if (wsId && wsId.length > 5) {
        wsClientId.value = wsId;
    } else {
        //获取新的WS客户端ID
        axios.get<string, string>('/api/im/client-id')
            .then(newWsId => {
                wsClientId.value = newWsId;
                localStorage.setItem('wsId', newWsId);
            });
    }
}

const joinChan = (chan: string) => {

    if (chan?.length <= 0) { chan = currentChan.value };

    axios.post('/api/im/join-chan', { params: { wsId: wsClientId.value, chan: chan } })
        .then(res => {
            console.log(res);
            u.NoticeNo('成功加入群组');
        });
}

const sendMsg = (msg: string, chan: string) => {
    axios.get('/api/im/send-chan-msg', {
        params: {
            wsId: wsClientId.value,
            chan: chan,
            msg: {
                code: "text",
                content: msg
            }
        }
    }).then(res => {
        console.log('群组发送消息', res);
    });
}

onMounted(() => {
    //获取wsID
    getWsId();
})

// const ws = new WebSocket("");
</script>
<style scoped lang='scss'></style>