import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/github'
import { u } from '@/utils/util'
import router from '@/router'
import { saveUser, clearUser } from '@/utils/github-user'

export const useUserStore = defineStore('user', {
    state: () => ({ username: '', avatar: '', token: '', branch: "", repo: '', loading: false }),
    getters: {
        nickname: (state) => state.username,
    },
    actions: {
        async getUserInfo(token: string) {
            this.loading = true
            await getUserInfo(token).then(res => {
                if (!(res && res?.login && res?.avatar_url)) {
                    u.MessageNo('信息获取失败，请检查token是否有效')
                    return;
                }
                this.avatar = res?.avatar_url
                this.username = res?.login
                this.token = token
                saveUser({
                    'username': this.username,
                    'avatar': this.avatar,
                    'token': token
                })
                this.loading = false
                u.MessageOk('请求成功！')
            }).catch(() => this.loading = false)
        },

        clear() {
            this.username = ''
            this.avatar = ''
            this.token = ''
            this.branch = ''
            this.repo = ''
            clearUser()
            u.MessageOk('用户信息已清空！')
        }
    },
})

