<template>
  <div id="Welcome-box">
    <!-- 顶部栏绝对定位 -->
    <span id="absolute">
      <!-- 顶部栏 -->
      <MyTopBar></MyTopBar>
    </span>
    <!-- 轮播图 -->
    <SlideShow></SlideShow>
    <!-- welcome主题内容 -->
    <WelcomeCnt></WelcomeCnt>
  </div>
</template>

<script>
// 引入需要的组件

// 头部栏组件
import MyTopBar from "@/components/content/TopBar/index.vue";
// 轮播图组件
import SlideShow from "@/views/Welcome/SlideShow/SlideShow.vue";
// welcome主题内容
import WelcomeCnt from "@/views/Welcome/WelcomeCnt/WelcomeCnt.vue";

export default {
  name: "Welcome",
  data() {
    return {};
  },
  components: {
    MyTopBar,
    SlideShow,
    WelcomeCnt,
  },
};
</script>

<style lang="scss" scoped>
#absolute {
  position: absolute;
  z-index: 3;
  left: 0px;
  top: 0px;
  width: 100%;
}
</style>
