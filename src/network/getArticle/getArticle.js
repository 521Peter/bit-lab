import { request } from "network/request.js";
// 获取全部文章信息
export function getArticle() {
    return request({
        url: 'http://47.120.42.169:8088/bitdf/article/queryArt',
        method: 'GET',
    })
}

export function getArticleByKey(key) {
    return request({
        url: 'http://47.120.42.169:8088/bitdf/article/queryArt?key=' + key,
        method: 'GET',
    })
}