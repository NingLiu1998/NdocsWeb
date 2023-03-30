import type { AxiosResponse } from 'axios'
import { ElNotification } from "element-plus"
import 'element-plus/dist/index.css'
import { u } from './util'
import type { reqRegisterUserType } from './types_api'
import Request from './service/req';
import type { RequestConfig } from './service/types';
import { getUser } from './github-user'


const codeStatus = {
    200: '请求成功',
    201: '创建成功',
    401: '认证失败！请输入有效token',
    403: '禁止访问，token可能失效！',
    404: '请求路径未找到',
    409: '资源已存在',
    500: '服务不可用',
    503: '服务不可用',
}

const request = new Request({
    // baseURL: '/github-api',
    baseURL: 'https://api.github.com',
    timeout: 1000 * 60 * 5,
    headers: {
        'Authorization': `token ${getUser()?.token}`,
    },
    interceptors: {
        // 请求拦截器
        requestInterceptors: config => config,
        requestInterceptorsCatch(err) {
            console.log('requestInterceptorsCatch', err)
        },
        // 响应拦截器
        responseInterceptors: (result: AxiosResponse) => {
            console.log('github-api', result)
            const { status, data } = result
            if (status == 200 || status == 201) {
                return result
            }
            u.MessageNo(codeStatus(status))
            return Promise.reject('unkonow error')
        },
        responseInterceptorsCatch: (err) => {
            console.log('err', err, err.response)
            u.MessageNo(codeStatus[err?.response?.status])
            return Promise.reject(codeStatus[err?.response?.status] || 'unknow error!')
        }
    },
})

console.log(request)


export default request
