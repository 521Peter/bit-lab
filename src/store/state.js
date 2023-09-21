// 1.引入Vue  Vuex
import Vue from "vue"
import Vuex from "vuex"

//2.安装插件
Vue.use(Vuex)

//类似于 methods
import mutations from "./mutations/mutations"
//类似于 computed
import getters from "./getters/getters"
//异步请求
import actions from "./actions/actions"
const state = sessionStorage.getItem('bitstate') ? JSON.parse(sessionStorage.getItem('bitstate')) : {
  //存放所有数据
  totalData: [],
  menu: {
    activeName: '1-1',
    openNames: ['1'],
  },
  // 登录后返回的用户信息
  userInfoList: JSON.parse(sessionStorage.getItem('userInfoList')) || [], 
  sessionId: sessionStorage.getItem('session') || '',
  // dark表示夜间模式
  dark: false,

  // 个人中心导航栏索引
  navIndex: sessionStorage.getItem('navIndex') || 0
}
// const mutations={
//  //更新我的个人信息user
//  updatauser(state,payload){
//   state.user=payload
//   this.commit('saveStateToStorage')
// },
//  // 将state持久化存储到本地
//  saveStateToStorage(state) {
//   sessionStorage.setItem('bitstate', JSON.stringify(state))
//    // console.log(this.state.tokenInfo)
// },
// }
//3. 创建对象
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})


// 4.导出store对象
export default store
