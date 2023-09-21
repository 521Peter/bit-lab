import { login } from 'network/login/login'
export default {
  // 用户登录
  async userLogin(context,value){
    const res = await login(value)
    if (res.code == '200') {
      context.commit('addSessionId',res.data.sessionId)
      context.commit('getUserInfo',res.data.user)
      sessionStorage.setItem('session', res.data.sessionId)
      sessionStorage.setItem('userInfoList', JSON.stringify(res.data.user))
      return res.code
    }else {
      return Promise.reject(res.msg)
    }
  }
}