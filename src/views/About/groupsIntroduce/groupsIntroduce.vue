<template>
  <div class="section-group-wrapper">
    <div class="contain" id="contain">
      <h2>实验室的主要<span>小组</span></h2>
      <el-row :gutter="35">
        <el-col
          class="ele-style"
          :xs="24"
          :sm="12"
          :md="8"
          v-for="(obj, index) in groupInfo"
          :key="index"
          ><div class="group-item">
            <!-- 字体图标 -->
            <div :style="obj.ibgc" v-animate="'queue-bottom'">
              <i :class="[`iconfont ` + obj.ifont]" :style="obj.icolor"></i>
            </div>
            <!-- 组名 -->
            <h4>{{ obj.title }}</h4>
            <!-- 小组介绍 -->
            <p>
              {{ obj.text }}
            </p>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  // 实验室介绍--组别
  props: ["groupInfo"],
};
</script>

<style lang="scss" scoped>
@import "assets/css/_content.scss";

// 实验室介绍---小组介绍
.section-group-wrapper {
  padding: 70px 0;
  @include background_color("bgc2");
  .contain {
    display: flex;
    height: 100%;
    // 设置主轴为列方向
    flex-direction: column;
    // 设置主轴上的元素垂直居中
    justify-content: center;
    padding: 0 15px;
    // 溢出的内容裁剪掉
    overflow: hidden;
    // 标题
    h2 {
      margin-bottom: 50px;
      text-align: center;
      font-size: 35px;
      @include font_color("mainTextClr");

      span {
        @include font_color("deputyTextClr");
      }
    }
    // 每个小卡片
    .group-item {
      // 开启flex布局
      display: flex;
      width: 295px;
      height: 307px;
      // 设置盒子大小只由width和height决定
      box-sizing: border-box;
      // 设置列为主轴
      flex-direction: column;
      padding: 30px 30px 0;
      margin-bottom: 40px;
      border-radius: 10px;
      background-color: #fff;
      @include background_opacity("bgOpacity");
      transition: all 0.5s;
      // 设置鼠标移动到小卡片上的动画效果
      &:hover {
        // 设置鼠标移入的过渡效果
        transition: all 0.5s;
        // 卡片向上移动
        transform: translate(0, -15px);
      }
      // 字体图标
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
        border-radius: 5px;
        background-color: #f1f1fd;
        transition: transform 1.5s, opacity 1.5s;
        i {
          font-size: 40px;
        }
      }
      // 组名
      h4 {
        margin: 32px 0;
        font-size: 24px;
        @include font_color("mainTextClr");
      }
      // 小组介绍
      p {
        font-size: 18px;
      }
    }
  }
}

// 屏幕宽度小于 1200 像素
@media screen and (max-width: 1200px) {
  // 实验室介绍---组别部分
  .section-group-wrapper {
    .contain {
      // 每个小卡片
      .group-item {
        width: 270px;
        height: 330px;
        margin-bottom: 40px;
      }
    }
  }
}

// 屏幕宽度小于 992 像素
@media screen and (max-width: 992px) {
  // 实验室介绍---组别部分
  .section-group-wrapper {
    .contain {
      // 每个小卡片
      .group-item {
        width: 330px;
        height: 305px;
        margin-bottom: 30px;
      }
    }
  }
}

// 屏幕宽度小于 768 像素
@media screen and (max-width: 768px) {
  // 实验室介绍---组别部分
  .section-group-wrapper {
    padding: 60px 0 50px;
    .contain {
      padding: 0;
      // 每个小卡片
      .group-item {
        width: 510px;
        height: 280px;
        margin-bottom: 30px;
      }
    }
  }
}

// 屏幕宽度小于 576 像素
@media screen and (max-width: 576px) {
  // 实验室介绍---组别部分
  .section-group-wrapper {
    .contain {
      padding: 0 15px;
      // 每个小卡片
      .group-item {
        width: 100%;
        height: 280px;
        margin-bottom: 30px;
      }
    }
  }
}

// 小组中的字体图标绑定的类
.queue-bottom {
  //使用动画，依次是：动画名称 执行动画所用的时间 贝塞尔曲线（用于定义物体的速度曲线） 动画结束后保持结束时的状态
  animation: goTop 1s cubic-bezier(0.5, 1, 0.89, 1) forwards;
}
</style>
