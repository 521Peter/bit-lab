// 这里作为插件的主入口，所有插件都经过这个文件
// 这样在main就不用引入很多插件了
import Vue from "vue"
import ElementUI from "./elementUI/element-config";
import Directive from "./directive"
Vue.use(ElementUI)
Vue.use(Directive)