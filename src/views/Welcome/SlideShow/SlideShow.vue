<template>
  <div class="SlideShow-box">
    <el-carousel
      height="100vh"
      direction="vertical"
      :autoplay="true"
      trigger="click"
    >
      <el-carousel-item
        v-for="item in items"
        :key="item.id"
        :style="{ backgroundImage: 'url(' + item.url + ')' }"
      >
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
// 引入发起请求的接口
import { getSlideImg } from "@/network/welcome/welcome.js";

export default {
  name: "SlideShow",
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async getSlideImage() {
      const { data } = await getSlideImg();
      this.items = data;
    },
  },
  created() {
    this.getSlideImage();
  },
};
</script>

<style lang="scss" scoped>
.SlideShow-box {
  position: absolute;
  width: 100%;
  height: 100%;
  .el-carousel {
    .el-carousel__item {
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  ::v-deep .el-carousel__indicators {
    z-index: 3;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
}
</style>
