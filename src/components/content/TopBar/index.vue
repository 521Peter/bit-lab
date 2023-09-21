<template>
  <div class="contain topbar-wrapper" id="contain">
    <!-- 实验室logo及其文字 -->
    <Logo />

    <!-- 右侧导航栏(当屏幕宽度小于992像素时隐藏) -->
    <RightNav />

    <!-- 迷你菜单块(当屏幕宽度小于992像素才显示) -->
    <MinMenu />
  </div>
</template>

<script>
import Logo from "./Logo.vue";
import RightNav from "./RightNav.vue";
import MinMenu from "./MinMenu.vue";

export default {
  name: "TopBar",
  components: { Logo, RightNav, MinMenu },
};
</script>

<style lang="scss" scoped>
@import "assets/css/_content.scss";

.topbar-wrapper {
  // 开启flex布局
  display: flex;
  // 元素左右分布
  justify-content: space-between;
  // 元素垂直居中
  align-items: center;
  height: 80px;
  padding: 10px 15px;
  // 设置文本颜色
  @include font_color("mainTextClr");
  transition: width 0.5s;
}

// 屏幕宽度小于 768 像素
@media screen and (max-width: 768px) {
  .topbar-wrapper {
    padding: 10px 0;
  }
}

// 屏幕宽度小于 576 像素
@media screen and (max-width: 576px) {
  .topbar-wrapper {
    padding: 10px 15px;
  }
}
</style>
