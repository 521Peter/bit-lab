<template>
  <section class="section-wrapper">
    <div class="contain section-contain" id="contain">
      <!-- 轮播图 -->
      <el-carousel
        :height="imgHeight + 'px'"
        class="section-img"
        trigger="click"
        :interval="4000"
      >
        <el-carousel-item v-for="item in slidesShows" :key="item.id">
          <img :src="item.url" />
        </el-carousel-item>
      </el-carousel>

      <!-- 实验室描述 -->
      <div class="page-content">
        <h2 class="title">我们的实验室为学生提供优质的<span>学习平台</span></h2>
        <p class="page-content-text">{{ labIntroduceText }}</p>
        <div class="page-info">
          <h3>
            Best Laboratory Overall World
            <p>Since 2018</p>
          </h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getSlidesShow } from "network/about/slideshow.js";

export default {
  data() {
    return {
      // 轮播图图片
      slidesShows: [],
      // 轮播图图片高度
      imgHeight: 540,
      // 实验室文字介绍
      labIntroduceText: `比特巅峰工作室是计算机学院网络工程系徐辉老师带领的一个团队。工作室一直坚持着快乐与进步并存的原则，让成员们通过实验项目得到锻炼与成长，抛开枯燥的工作氛围，同时收获佳绩，感受与众不同的工作室文化。`,
    };
  },
  methods: {
    // 响应图片大小
    respImgSize() {
      // // 防止一开始屏幕就是小的，导致图片高度有问题
      // if (window.innerWidth < 1200) {
      //   this.imgHeight = 450;
      // } else {
      //   this.imgHeight = 540;
      // }
      // // 当屏幕大小发生改变时触发该函数
      // window.addEventListener("resize", () => {
      //   // 当屏幕的宽小于1200px时
      //   if (window.innerWidth < 1200) {
      //     // 将轮播图的图片高度改为450px
      //     this.imgHeight = 450;
      //   } else {
      //     this.imgHeight = 540;
      //   }
      // });
      const el = document.querySelector(".section-img");
      console.log(el);
      const callback = (entries) => {
        this.imgHeight = entries[0].contentRect.height;
      };
      const observer = new ResizeObserver(callback);
      observer.observe(el);
    },
  },
  async created() {
    // 发送axios请求，获取轮播图信息
    const { data } = await getSlidesShow();
    this.slidesShows = data;
  },
};
</script>

<style lang="scss" scoped>
@import "assets/css/_content.scss";

// 实验室介绍---轮播图部分
.section-contain {
  display: flex;
  width: 1110px;
  margin: 70px auto;
  .section-img {
    width: 540px;
    height: 540px;
    img {
      width: 100%;
      height: 100%;
      @include background_opacity("bgOpacity");

      transition: all 0.6s;
    }
  }
  .page-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 540px;
    margin-left: 30px;
    transition: all 0.6s;
    h2 {
      font-size: 35px;
      @include font_color("mainTextClr");
      span {
        @include font_color("deputyTextClr");
      }
    }
    .page-content-text {
      font-size: 18px;
      line-height: 26px;
    }
    .page-info {
      display: flex;
      width: 540px;
      height: 132px;
      align-items: center;
      box-sizing: border-box;
      padding: 30px 40px;
      border-left: 5px solid #7977ee;
      font-size: 26px;
      background-color: #eaeaea;
      @include background_opacity("bgOpacity");
      h3 {
        @include font_color("mainTextClr");
        p {
          @include font_color("deputyTextClr");
        }
      }
    }
  }
}

// 屏幕宽度小于 1200 像素
@media screen and (max-width: 1200px) {
  // 实验室介绍--轮播图部分
  .section-contain {
    .section-img {
      width: 450px;
      height: 450px;
      margin-left: 15px;
      img {
        width: 100%;
        height: 100%;
        @include background_opacity("bgOpacity");
      }
    }
    .page-content {
      width: 450px;
      .page-info {
        width: 450px;
        height: 168px;
      }
    }
  }
}

// 屏幕宽度小于 992 像素
@media screen and (max-width: 992px) {
  // 图片隐藏
  .section-img {
    display: none;
  }

  // 实验室介绍--轮播图部分
  .section-contain {
    margin: 70px auto;
    .page-content {
      width: 100%;
      margin-left: 0;
      padding: 0 15px;
      .page-info {
        width: 690px;
        height: 132px;
      }
    }
  }
  .page-content-text {
    margin: 40px 0;
  }
}

// 屏幕宽度小于 768 像素
@media screen and (max-width: 768px) {
  // 实验室介绍---轮播图部分
  .section-contain {
    .page-content {
      width: 510px;
      padding: 0;
      box-sizing: border-box;
      .page-info {
        width: 510px;
        height: 132px;
      }
    }
  }
}

// 屏幕宽度小于 576 像素
@media screen and (max-width: 576px) {
  // 实验室介绍---轮播图部分
  .section-contain {
    .page-content {
      width: 100%;
      padding: 0 15px;
      .page-info {
        width: 100%;
        height: 132px;
      }
    }
  }
}
</style>
