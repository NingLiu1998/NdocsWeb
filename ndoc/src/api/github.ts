import request from '@/utils/github'
import { replacePath } from '@/utils/github-user'



/**
 * 
 * @param accessToken token
 * @returns void
 */
export function getUserInfo(accessToken: string) {
    return request.instance({
        url: `/user`,
        method: 'GET',
        headers: {
            'Authorization': `token ${accessToken}`,
        }
    })
}

/**
 *  获取仓库列表
 * @param name username
 * @returns promise
 */
export function getUserRepos(name: string) {
    return request.instance({
        url: `/users/${name}/repos`,
        method: 'GET'
    })
}

/**
 * 获取指定仓库内容
 * @param name username
 * @param repoName reponame
 * @param path path
 * @returns promise
 */
export function getReposContents(name: string, repoName: string, path: string) {
    return request.instance({
        url: replacePath(`/repos/${name}/${repoName}/contents/${path}`),
        method: 'GET'
    })
}

/**
 * 
 * @param name username
 * @param repoName reponame
 * @param filePath 文件路径
 * @param data 数据
 * @returns promise
 */
export function delFile(name: string, repoName: string, filePath: string, data: any) {
    console.log('delete@@@@@@',  replacePath(`https://api.github.com/repos/${name}/${repoName}/contents/${filePath}` ))
    return request.instance({
        url:  replacePath(`/repos/${name}/${repoName}/contents/${filePath}`),
        method: 'DELETE',
        data
    })
}


/**
 * 文件上传
 * @param name username 
 * @param repoName reponame
 * @param path path
 * @param fileName filename
 * @param data data
 * @returns promise
 */
export function upload(name: string, repoName: string, path: string, fileName: string, data: any) {
    return request.instance({
        url: replacePath(`/repos/${name}/${repoName}/contents/${path}/${fileName}`),
        method: 'PUT',
        data
    })

}
