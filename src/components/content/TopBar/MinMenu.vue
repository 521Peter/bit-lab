<template>
  <div class="menu">
    <input type="checkbox" id="toggler" @click="menuBtnFn($event)" />
    <!-- 将box盒子与input表单绑定起来 -->
    <label for="toggler">
      <!-- 手写菜单图标 -->
      <div class="hamburger-container">
        <span></span>
        <span></span>
      </div>
    </label>
    <!-- 隐藏的菜单内容 -->
    <div class="menu-content">
      <RouteNav class="route-lead" @closeMenu="closeMenu">
        <!-- 夜间切换模式 -->
        <div class="switch-button" slot="modeToggle">
          <!-- <span>外观</span> -->
          <ModeToggle />
        </div>
      </RouteNav>
    </div>
  </div>
</template>

<script>
import RouteNav from "./common/RouteNav.vue";
import ModeToggle from "./common/ModeToggle.vue";

export default {
  methods: {
    // 菜单按钮
    menuBtnFn(e) {
      // 当屏幕大小发生改变时触发该函数
      window.addEventListener("resize", () => {
        // 当屏幕的宽大于992px时
        if (window.innerWidth > 992) {
          // 隐藏菜单内容
          e.target.checked = false;
        }
      });
    },
    closeMenu() {
      document.querySelector('#toggler').checked = false
    }
  },
  components: { RouteNav, ModeToggle },
};
</script>

<style lang="scss" scoped>
@import "assets/css/_content.scss";

// 导航菜单
.menu {
  // 隐藏
  display: none;
  #toggler {
    display: none;
  }
  // 菜单按钮
  .hamburger-container {
    position: relative;
    width: 25px;
    height: 25px;
    padding: 3px 5px 5px;
    cursor: pointer;
    span {
      position: relative;
      display: block;
      height: 3px;
      top: 0;
      @include background_color("deputyTextClr");
      // 设置线由交叉变回平行时的过渡效果
      transition: transform 0.3s ease-in-out, top 0.3s ease-in-out 0.3s;
      &:nth-child(1) {
        margin-top: 7px;
      }
      &:nth-child(2) {
        margin-top: 7px;
      }
    }
  }
  // 单选框被勾选的情况下，设置第1根线的样式
  #toggler:checked + label .hamburger-container span:nth-child(1) {
    // 顺时针旋转45度
    transform: rotate(45deg);
    // 向下移动4px
    top: 5px;
    // 设置线由平行变为交叉时的过渡效果，先用0.3s做top的动画，再用0.3s做旋转的动画
    transition: top 0.3s ease-in-out, transform 0.3s ease-in-out 0.3s;
  }
  // 单选框被勾选的情况下，设置第2根线的样式
  #toggler:checked + label .hamburger-container span:nth-child(2) {
    // 逆时针旋转45度
    transform: rotate(-45deg);
    // 向上移动4px
    top: -5px;
    // 设置线由平行变为交叉时的过渡效果，先用0.3s做top的动画，再用0.3s做旋转的动画
    transition: top 0.3s ease-in-out, transform 0.3s ease-in-out 0.3s;
  }
  // 隐藏的导航块
  .menu-content {
    // 开启绝对定位
    position: absolute;
    width: 100%;
    height: 100vh;
    // 设置层级
    z-index: 98;
    top: 80px;
    right: 0px;
    padding: 3px 0;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out 0.3s,
      background-color 1s, color 1.5s;
    transform-origin: 50% 0;
    // 垂直方向缩小为0
    transform: scaleY(0);
    // 设置透明度为0,即完全看不见
    opacity: 0;
    @include font_color("menuTextClr");
    @include background_color("menuBgc");
    .route-lead {
      width: 350px;
      margin: 0 auto;
      margin-top: 50px;
      ::v-deep .avatar {
        display: none;
      }
      ::v-deep li {
        margin: 0 5px;
        padding: 20px 13px;
        border-bottom: 1px solid;
        @include border_color("menuBorderClr");
        font-size: 18px;
        cursor: pointer;
        // &:nth-child(1) {
        //   display: none;
        // }
        // 设置鼠标移动到li时的效果
        &:hover {
          transition: all 0.5s;
          color: #ffd404;
        }
      }
      .switch-button {
        display: flex;
        // 设置为两边放置
        justify-content: space-between;
        margin-top: 26px;
        padding: 20px 28px;
        border-radius: 20px;
        @include background_color("switchBtnBgc");
      }
    }
  }
  // 单选框被勾选的情况下，设置隐藏的导航块显示出来
  #toggler:checked ~ .menu-content {
    // 垂直方向变为一倍
    transform: scaleY(1);
    opacity: 1;
  }
}

// 屏幕宽度小于 992 像素
@media screen and (max-width: 992px) {
  // 导航菜单
  .menu {
    // 显示导航菜单
    display: block;
  }
}
</style>
