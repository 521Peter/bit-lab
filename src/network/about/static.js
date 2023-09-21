import { request } from "../request";

// 获取about页面中的轮播图信息
export function getStaticInfo() {
  return request({
    url: '/bitdf/about/get/static',
    method: "GET",
  })
}
