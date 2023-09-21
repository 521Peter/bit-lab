import { request } from "network/request.js";
// 文章收藏
export function articlecollect(articleId, collectorId) {
    return request({
        url: 'http://47.120.42.169:8088/bitdf/articlecollect/collect?articleId=' + articleId + '&collectorId=' + collectorId,
        method: 'GET',

    })
}