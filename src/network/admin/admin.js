import { request } from "network/request";
//获取轮播图的图片
export function getSlideList(slideshow){
    return request({
        url:`/bitdf/slideshow/list?page=${slideshow.page}`,
        method:"GET",
        // data:{
        //     account:userInfo.username,
        //     password:userInfo.password
        // }
    }) 
}
//获取所有学生提交的申请
export function getApplyList(){
    return request({
        url:"/bitdf/apply/admin/list",
        method:"GET",
       
    }) 
}

//导出所有学生提交的申请
export function exportApplyList(){
    return request({
        url:"/bitdf/apply/admin/export",
        method:"GET",
       
    }) 
}