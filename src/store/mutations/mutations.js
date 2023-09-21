export default {
  addSessionId(state, value) {
    state.sessionId = value
  },
  // 登录后得到用户信息
  getUserInfo(state, value) {
    state.userInfoList = value
  },
  modifyAccountNavIndex(state, value) {
    state.navIndex = value
  },
  //更新我的个人信息user
  updatauser(state, payload) {
    state.user = payload
    this.commit('saveStateToStorage')
  },
  // 将state持久化存储到本地
  saveStateToStorage(state) {
    sessionStorage.setItem('bitstate', JSON.stringify(state))
    // console.log(this.state.tokenInfo)
  },



}
