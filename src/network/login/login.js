import { request } from "../request";

export function login(userInfo){
    return request({
        url:"/bitdf/user/login",
        method:"POST",
        data:{
            account:userInfo.username,
            password:userInfo.password
        }
    }) 
}
