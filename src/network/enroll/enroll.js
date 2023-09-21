import { request } from "network/request.js";
// 保存报名信息
export function saveStuInfo(data) {
  return request({
    url: 'http://47.120.42.169:8088/bitdf/apply/save',
    method: 'POST',
    data
  })
} 