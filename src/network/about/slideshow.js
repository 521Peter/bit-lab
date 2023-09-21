import { request } from "../request";

// 获取about页面中的轮播图信息
export function getSlidesShow() {
  return request({
    url: "/bitdf/slideshow/list",
    method: "GET",
    params: {
      page: 1,
    },
  });
}
