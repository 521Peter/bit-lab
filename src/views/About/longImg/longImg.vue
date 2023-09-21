<template>
  <el-row>
    <!-- 顶部导航栏下面的图片 -->
    <el-col :span="24" class="aboutPage">
      <!-- 设置背景图片的遮罩层 -->
      <div class="shade">
        <!-- 背景图中的文字 -->
        <div class="about-title">
          <h2>关于我们</h2>
          <span>home</span>
          <span>/about us</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "assets/css/_content.scss";
// 长背景图
$logBgcImg: "~assets/img/about/long_page.jpg";

// 顶部导航栏下面的长图
.aboutPage {
  width: 100%;
  height: 354px;
  background: url($logBgcImg) no-repeat;
  background-position: center;
  // 设置背景透明度
  @include background_opacity("bgOpacity");
  /* 解决高度塌陷 */
  overflow: hidden;
  // 遮罩层
  .shade {
    display: flex;
    position: absolute;
    background-color: #4a425b;
    height: 100%;
    width: 100%;
    opacity: 0.8;
  }
  // 图片中间的文字
  .about-title {
    width: 230px;
    height: 78px;
    margin: auto;
    // 整个容器实现垂直居中
    align-items: center;
    // 文字垂直居中
    text-align: center;
    color: #fff;
    h2 {
      font-weight: 700;
      font-size: 42px;
      span {
        font-size: 16px;
      }
    }
  }
}
</style>
