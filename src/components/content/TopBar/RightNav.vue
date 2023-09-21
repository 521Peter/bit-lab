<template>
  <RouteNav class="lead-items">
    <!-- 搜索按钮 -->
    <Search slot="search" class="search" />
    <!-- 夜间切换模式 -->
    <li slot="modeToggle" class="toggle">
      <ModeToggle />
    </li> 
  </RouteNav>
</template> 

<script>
import RouteNav from "./common/RouteNav.vue";
import Search from "./common/Search.vue";
import ModeToggle from "./common/ModeToggle.vue";

export default {
  components: { RouteNav, Search, ModeToggle },
};
</script>

<style lang="scss" scoped>
@import "assets/css/_content.scss";

// 导航栏
.lead-items {
  display: flex;
  align-items: center;
  ::v-deep li {
    span {
      // 设置文字无法选中
      user-select: none;
    }
    &:last-child {
      padding: 0;
    }
    // 设置移动到li元素时的效果
    &:hover {
      // 设置鼠标的形状为小手
      cursor: pointer;
      transition: all 0.5s;
      color: #FFD404;
    }
    display: flex;
    align-items: center;
    padding: 15px 10px;
  }
  // 用户头像模块
  ::v-deep .avatar {
    position: relative;
    width: 40px;
    height: 40px;
    margin: 0 10px;
    cursor: pointer;
    // 用户头像
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 999;
      border-radius: 50%;
      scale: 1;
      left: 0;
      top: 0;
      transition: all 0.5s;
    }
    // 鼠标移动到头像后显示的内容
     .detail-content {
      display: none;
      position: absolute;
      width: 300px;
      height: 400px;
      left: -390%;
      top: 40px;
      z-index: 998;
      border-radius: 20px;
      opacity: 0;
      box-shadow: 0 0 30px #24282f;
      background-color: #fff;
      transition: all 0.5s;
      // 用户名
      .userName {
        margin: 55px 0 20px;
        text-align: center;
        font-size: 20px;
        color: #18191c;
      }
      ul.funciton-box {
        box-sizing: border-box;
        padding: 10px 25px;
        // 线
        .line {
          width: 100%;
          height: 1px;
          margin-bottom: 20px;
          background-color: #e3e5e7;
        }
        // 每个功能模块
        li {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          margin-bottom: 15px;
          border-radius: 10px;
          // 字体图标
          i {
            font-size: 20px;
          }
          // 功能介绍
          span {
            margin-left: -100px;
          }
          // 鼠标移动到li时的效果
          &:hover {
            background-color: #e3e5e7;
            color: #616680;
          }
        }
      }
    }
    // 鼠标移动到头像后显示隐藏的内容
    &:hover img ~.detail-content {
      display: block;
      opacity: 1;
    }
    // 鼠标移动到头像后的过渡效果
    &:hover img {
      scale: 2;
      left: -20px;
      top: 20px;
      transition: all 0.5s;
    }
  }
}
 
// 屏幕宽度小于 992 像素
@media screen and (max-width: 992px) {
  // 导航块
  .lead-items {
    margin-left: auto;
    margin-right: 6px;
    // 路由导航
    ::v-deep .routeLead {
      display: none;
    }
    // 夜间模式切换
    ::v-deep .toggle {
      display: none;
    }
    // 搜索按钮
    ::v-deep .search {
      margin-right: 10px;
    }
  }
}

// 屏幕宽度小于 768 像素
@media screen and (max-width: 768px) {
  .lead-items {
    // 用户头像模块
    ::v-deep .avatar {
      // 鼠标移动到头像后显示的内容
      .detail-content {
        left: -570%;
      }
    }
  }
}
</style>