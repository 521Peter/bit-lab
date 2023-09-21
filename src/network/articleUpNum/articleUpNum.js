import { request } from "network/request.js";
// 文章点赞
export function articleUpNum(useId, artId) {
    return request({
        url: 'http://47.120.42.169:8088/bitdf/article/upNum',
        method: 'POST',
        data: {
            useId: useId,
            artId: artId
        },
    })
}