import { request } from "network/request.js";
// 根据id获取文章评论
export function getReview(artId) {
    return request({
        url: 'http://47.120.42.169:8088/bitdf/article/reply/getReply/' + artId,
        method: 'GET',
    })
}