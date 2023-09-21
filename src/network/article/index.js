import { request } from "../request";

// GET如果有请求参数就使用params，POST用data
// 有要携带参数的，记得在函数上设置形参来接收

// 上传文章/新建文章
export function uploadArticle(data) {
  return request({
    url: "/bitdf/article/save",
    method: "POST",
    data,
  });
}

// 获取所有文章
export function fetchAllArticle() {
  return request({
    url: "/bitdf/article/root/queryArt",
    method: "GET",
  });
}

// 更新文章内容
export function update(data) {
  return request({
    url: "/bitdf/article/update",
    method: "POST",
    data, 
  });
}
