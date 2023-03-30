export const userToken_key = "user_token"

export interface User {
    username?: string,
    token?: string
    type?: string
    branch?: string
    avatar?: string,
    userUrl?: string,
}

export type IdType = 'uuid' | 'imgName'

export const defaultCDN = 'https://cdn.jsdelivr.net'

export interface Setting {
    isCustomUrl?: boolean
    customId: IdType
    uploadUrl?: string
    message: string
    isCDN?: boolean
    CDN?: string,
    branch?: string,
    repo?: string,
    path?: string,
    markdown?:boolean,
    customCDN?:string
}