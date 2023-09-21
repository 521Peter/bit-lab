import { request } from "network/request.js";
// 根据id获取文章信息
export function getArticleByid(artId) {
    return request({
        url: 'http://47.120.42.169:8088/bitdf/article/queryByArtId2?artId=' + artId,
        method: 'GET',
    })
}