import { request } from "network/request.js";
// 文章评论
export function articleReview(artId, repWork) {
    return request({
        url: 'http://47.120.42.169:8088/bitdf/article/reply',
        method: 'POST',
        data: {
            artId: artId,
            repWork: repWork
        },
    })
}