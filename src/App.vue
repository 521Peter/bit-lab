<template>
  <div id="app">
    <TopBar v-if="$route.meta.showTopBar" />
    <!-- 顶部导航栏 -->
    <!-- 缓存需要发送多次网络请求的页面 -->
    <keep-alive :include="['about']">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import TopBar from "components/content/TopBar";

export default {
  // 注册组件
  components: {
    TopBar,
  },
  name: "App",
  data() {
    return {};
  },
  created() {
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("navIndex", this.$store.state.navIndex);
    });
  },
};
</script>

<style lang="scss">
// 清除默认样式
@import "assets/css/normalize.css";
// 引入已配置的样式
@import "assets/css/_content.scss";
// 使用响应式布局的框架约束
@include responsive_constraint();
$bgColor: #f5f5f5;
body {
  background-color: $bgColor;
}
</style>
