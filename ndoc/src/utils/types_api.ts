export interface reqRegisterUserType {
    name?: string,
    account?: string,
    wsClientId?: string,
    email?: string,
    phone?: string,
    pwd?: string
}


export interface resMainMenuType {
    title: string,
    url?: any,
    children?: resMainMenuType[]
}