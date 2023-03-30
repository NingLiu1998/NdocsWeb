import { http } from '../utils/http'

export function getRouters() {
    return http({
        url: '/router'
    })
}