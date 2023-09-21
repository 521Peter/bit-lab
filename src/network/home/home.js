import { request } from "../request";

export function getTestData() {
  return request({
    url: '/test',

    // 如果有请求参数就使用params
    // params: {
    // name:name
    // },
  }) 
}

//有要携带参数的  记得在函数上设置形参来接收
export function addUser(id) {
  return request({
    url: 'xxxx',
    // 如果需要发送post请求，就得单独设置请求类型
    method: 'POST',
    // 此时携带的参数变为 data
    data: {
      id: id
    }
  })
}