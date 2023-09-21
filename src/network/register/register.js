import { request } from "../request";
// 提交注册信息
export function registerUserInfo(stuNum,mail,password){
  return request({
    url:'/bitdf/user/register',
    method: 'POST',
    data: {
      stuNum,
      mail,
      password
    }
  })
}
// 查询手机号是否存在
export function queryPhone(phone){
  return request({
    url:'/bitdf/user/register',
    method: 'POST',
    data: {
      phone
    }
  })
}
// 查询邮箱是否存在
export function queryMail(mail){
  return request({
    url:'/bitdf/user/register',
    method: 'POST',
    data: {
      mail
    }
  })
}