// http.ts
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import qs from "qs"
import { ElNotification } from "element-plus"
import 'element-plus/dist/index.css'
import { u } from './util'
import type { registerModel } from './types'


// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
axios.defaults.baseURL = "http://localhost:8081";
// 携带 cookie，对目前的项目没有什么作用，因为我们是 token 鉴权
axios.defaults.withCredentials = true
// 请求头，headers 信息
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers['token'] = localStorage.getItem('token') || ''
// 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
axios.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8'


axios.interceptors.response.use(
    response => {
        console.log(response);
        if (response.status == 200) {
            return Promise.resolve(response.data.data);
        } else {
            u.NoticeNo(response.data.errors, 'api请求返回非200')
            return Promise.reject(response);
        }
    },
    error => {
        u.NoticeNo('代码发霉了', 'api请求发生了错误');
    }
)





//通用服务
class service {
    static register = (uInfo: registerModel) => {
        axios.post('/api/system/register', {
            params: uInfo
        }).then(res => {
            u.NoticeOk('账号注册成功')
            console.log('注册', res);
        });
    }
}

export { axios, service }