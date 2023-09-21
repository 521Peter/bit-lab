<template>
  <div class="lab-introduce-wrapper">
    <div class="contain" id="contain">
      <el-row class="lab-introduce">
        <el-col
          :xs="12"
          :sm="12"
          :lg="6"
          :xl="6"
          class="introduce-col"
          v-for="(obj, index) in countInfo"
          :key="index"
          ><div class="introduce-item">
            <!-- 字体图标容器 -->
            <div class="i" :style="obj.ibgc">
              <!-- 字体图标 -->
              <i :class="[`iconfont ` + obj.i]" :style="obj.icolor"></i>
            </div>
            <!-- 文字容器 -->
            <div class="text-content">
              <!-- 标题 -->
              <h3 :style="obj.icolor" v-numAutoAdd>{{ obj.count }}</h3>
              <!-- <h3 v-numAutoAdd>666</h3> -->
              <!-- 文字内容 -->
              <span>{{ obj.text }}</span>
            </div>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  // 图标部分的相关数据
  props: ["countInfo"],
};
</script>

<style lang="scss" scoped>
@import "assets/css/_content.scss";

// 实验室介绍---图标部分
.lab-introduce-wrapper {
  margin-bottom: 70px;
  .lab-introduce {
    display: block;
    // 图标和文字
    .introduce-item {
      display: flex;
      width: 245px;
      padding: 0 15px;
      @include background_opacity("bgOpacity");

      // 字体图标容器
      .i {
        width: 60px;
        height: 60px;
        margin-right: 18px;
        text-align: center;
        border-radius: 50%;
        // 字体图标
        i {
          display: inline-block;
          margin-top: 10px;
          font-size: 34px;
        }
      }
      // 文字描述
      .text-content {
        display: inline-block;
        width: 150px;
        height: 60px;
        h3 {
          font-size: 30px;
        }
      }
    }
  }
}

// 屏幕宽度小于 1200 像素
@media screen and (max-width: 1200px) {
  // 实验室介绍---图标部分
  .lab-introduce-wrapper {
    .lab-introduce {
      .introduce-item {
        margin-bottom: 20px;
      }
    }
  }
}

// 屏幕宽度小于 768 像素
@media screen and (max-width: 768px) {
  .lab-introduce-wrapper {
    .lab-introduce {
      // 图标和文字
      .introduce-item {
        padding: 0;
      }
    }
  }
}

// 屏幕宽度小于 576 像素
@media screen and (max-width: 576px) {
  // 实验室介绍---图标部分
  .lab-introduce-wrapper {
    height: 425px;
    .lab-introduce {
      padding: 0 15px;
      .introduce-col {
        width: 100%;
        .introduce-item {
          width: 100%;
          height: 90px;
          margin-right: 100px;
          padding: 0;
        }
      }
    }
  }
}
</style>
