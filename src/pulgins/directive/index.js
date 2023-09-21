import animate from "./animate";
import numAutoAdd from "num-auto-add";
import lazy from "./lazy";

export default {
  install(Vue) {
    Vue.directive('numAutoAdd', numAutoAdd());
    Vue.directive('animate', animate);
    Vue.directive('lazy', lazy);
  }
}
