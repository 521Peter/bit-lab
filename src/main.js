import Vue from 'vue'
import App from './App'
import router from './router'
import store from "store/state"
import './pulgins'
import VueCookies from "vue-cookies";

import 'github-markdown-css';


/*
  *Vue.config.productionTip = false
  *阻止启动生产消息
  *如果没有这句代码，开发环境下，Vue 会提供很多警告来帮你对付常见的错误与陷阱。
*/
Vue.config.productionTip = false
Vue.use(VueCookies);

Vue.prototype.$store = store

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  //安装全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  }
})

