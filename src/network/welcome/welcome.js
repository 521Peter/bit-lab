import { request } from "../request";

// GET如果有请求参数就使用params，POST用data
//有要携带参数的  记得在函数上设置形参来接收
export function getSlideImg() {
  return request({
    url: '/bitdf/slideshow/list?page=2',
    // 如果需要发送post请求，就得单独设置请求类型
    method: 'GET',
  })
}