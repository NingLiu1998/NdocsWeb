import localCache from '@/utils/cache'
import { userToken_key } from '@/model/github'
import type { User } from '@/model/github'


export const getUser: User = () => {
    return localCache.getCache(userToken_key)
}

export const clearUser: void = () => {
    localCache.clearCache(userToken_key)
}

export const saveUser: void = (user: User = {}) => {
    localCache.setCache(userToken_key, user)
}

/**
 * 接口防刷
 * @param fn 函数
 * @param wait time
 * @returns 
 */
export function debounce(fn: Function, wait: number) {
    let timer = 0
    let start = Date.now()
    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn()
            start = Date.now()
            timer = null
        }, wait);
    }
}


/**
 * 判断文件是不是图片
 * @param fileName 文件名
 */
export function isImage(fileName: string) {
    let ext = fileName.substring(fileName.lastIndexOf('.'))
    let regex = /apng|avif|bmp|gif|ico|svg|png|jpg|jpeg|weap|tiff/i
    return regex.test(ext)
}

/**
 * 检查是否合法URL
 * @param url url
 * @returns true
 */
export function validCDN(url: string) {
    let regex = /^((http(s?)):\/\/|\/\/)[^\s]+\.[^\s]+$/
    return regex.test(url)
}


/**
 * 路径容易拼接错误，实在是没办法了，直接上正则表达式
 * 路径替换 处理路径错误问题
 * 'https:///api//contents/i//d'   => 'https://api/contents/i/d'
 * 'https:/api//contents/i//d'     => 'https://api/contents/i/d'
 * 'api//contents//i///d'          => 'api/contents/i/d'
 * @param url url
 * @returns true
 */
export function replacePath(url: string) {
    return url.replace(/\/+/g,'/').replace(/:\/+/,'://')
}


/**
 * 将对象2内容拷贝到对象2，因为Vue3中不能直接赋值 例如 Object.assign({},...objs)，造成响应式丢失问题
 * @param o1 对象1
 * @param o2 对象2
 */
export function init(o1, o2) {
    for (const key in o2) {
        if (Object.prototype.hasOwnProperty.call(o2, key)) {
            o1[key] = o2[key];
        }
    }
}

