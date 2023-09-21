<template>
  <div class="logo-wrapper">
    <img :src="labLogo"/>
    <!-- 标题 -->
    <h2>BIT LAB</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 实验室logo图片
      labLogo: "",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "assets/css/_content.scss";

// logo及其标题
.logo-wrapper {
  display: flex;
  // 实验室logo图
  img {
    height: 30px;
    margin: -5px 9px 0 0;
    cursor: pointer;
  }
  h2 {
    font-size: 22px;
    @include font_color("deputyTextClr");
  }
}
</style>
