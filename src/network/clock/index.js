import { request } from "../request";

// GET如果有请求参数就使用params，POST用data
// 有要携带参数的，记得在函数上设置形参来接收

// 更新打卡记录
export function uploadClockRecord(data) {
  return request({
    url: "/bitdf/clock/edit",
    method: "POST",
    data,
  });
}

// 获取打卡记录
export function fetchClockRecord() {
  return request({
    url: "/bitdf/clock/fetch",
    method: "GET",
  });
}