import {
  request
} from "network/request";

// 更新用户信息
export function updataUserInfo(form) {
  return request({
    url: "/bitdf/user/update/person/info",
    method: "POST",
    data:form
  })
}

// 修改头像
export function updataUserImg(formData) {
  return request({
    url: "/bitdf/user/upload/img/",
    method: "POST",
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    // responseType: 'blob',
    data:formData
  })
}

// 修改密码
export function modifyPass(oldPassword, newPassword) {
  return request({
    url: "/bitdf/user/modify/password/",
    method: "POST",
    data: {
      oldPassword,
      newPassword
    }
  })
}

// 获取用户信息 
export function getUserInfo() {
  return request({
    url: "/bitdf/user/getCurrentUser",
    method: "GET"
  })
}

// 根据用户id获取用户作品信息
export function getUserText(author) {
  return request({
    url: `/bitdf/article/getArticle?`,
    method: "GET",
    params: {
      author
    },
  })
}

// 根据用户Id查询所有的收藏信息
export function getUserCollect(id){
  return request({
    url: `/bitdf/articlecollect/collectbyuserid?`,
    method: "GET",
    params: {
      collectorId: id
    },
  })
}

// 获取用户好友列表
export function getFriendList(userId){
  return request({
    url: `/bitdf/user/friends?`,
    method: "GET",
    params: {
      userId
    },
  })
}

// 收藏文章，取消收藏文章的接口
export function collectText(articleId,collectorId){
  return request({
    url: `/bitdf/articlecollect/collect?`,
    method: "GET",
    params: {
      articleId,
      collectorId
    },
  })
}