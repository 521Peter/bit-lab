<template>
  <div class="backTop">
    <el-backtop :bottom="80"></el-backtop>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "assets/css/_content.scss";

.backTop {
  // 设置整个回到顶部按钮
  ::v-deep .el-backtop {
    @include background_color("topBackBtnBgc");
    transition: background 0.3s;
    &:hover {
      @include background_color("topBackBtnHoverBgc");
    }
  }
  // 设置图标的样式
  ::v-deep .el-icon-caret-top {
    @include font_color("deputyTextClr");
  }
}
</style>
