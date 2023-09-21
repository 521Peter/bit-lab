<template>
  <div>
    <!-- 每一个项目介绍 -->
    <div class="item" v-for="(item, index) in projectInfo" :key="index">
      <div class="contain" id="contain">
        <!-- 项目名称 -->
        <h2 class="title">{{ item.title }}</h2>
        <div class="content-wrapper">
          <!-- 装图片的容器 -->
          <div class="img-wrapper" v-animate="'img-animate'">
            <img :data-src="item.urlList[0]" v-lazy />
          </div>
          <!-- 装文字的容器 -->
          <div class="text-wrapper" v-animate="'text-animate'">
            <span>{{ item.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 项目信息
  props: ["projectInfo"],
};
</script>

<style lang="scss" scoped>
@import "assets/css/_content.scss";
// 每个项目
.item {
  width: 100%;
  padding: 70px 0;
  .contain {
    // 项目名称
    .title {
      font-size: 35px;
      text-align: center;
      margin-bottom: 50px;
      padding: 0 10px;
      @include font_color("deputyTextClr");
    }
  }
}
// 为奇数的项目
.item:nth-child(2n + 1) {
  @include background_color("bgc2");
  // 装文字的容器
  .text-wrapper {
    margin-left: 30px;
  }
  // 给图片设置向右移动的动画
  .img-animate {
    animation: goRight 0.7s ease-in forwards;
  }
}
// 为偶数的项目
.item:nth-child(2n) {
  // 装文字的容器
  .text-wrapper {
    margin-right: 30px;
    order: -1;
  }
  // 给图片设置向左移动的动画
  .img-animate {
    animation: goLeft 0.7s ease-in forwards;
  }
}
// 设置第三个项目
.item:nth-child(3) {
  display: block;
}

.content-wrapper {
  display: flex;
  // 装图片的容器
  .img-wrapper {
    width: 50%;
    img {
      width: 100%;
    }
  }
  // 装文字的容器
  .text-wrapper {
    display: flex;
    width: 50%;
    padding: 10px;
    align-items: center;
    span {
      font-size: 20px;
      line-height: 35px;
    }
  }
}

// 屏幕宽度小于 1200 像素
@media screen and (max-width: 1200px) {
  .content-wrapper {
    // 装文字的容器
    .text-wrapper {
      span {
        font-size: 18px;
        line-height: 30px;
      }
    }
  }
}

// 屏幕宽度小于 992 像素
@media screen and (max-width: 992px) {
  .content-wrapper {
    // 装文字的容器
    .text-wrapper {
      padding: 0;
      span {
        font-size: 16px;
        line-height: 25px;
      }
    }
  }
  // 为奇数的项目
  .item:nth-child(2n + 1) {
    // 装文字的容器
    .text-wrapper {
      margin-left: 15px;
    }
  }
  // 为偶数的项目
  .item:nth-child(2n) {
    // 装文字的容器
    .text-wrapper {
      margin-right: 15px;
    }
  }
}

// 屏幕宽度小于 768 像素
@media screen and (max-width: 768px) {
  // 为奇数的项目
  .item:nth-child(2n + 1) {
    // 装文字的容器
    .text-wrapper {
      margin-left: 0px;
    }
  }
  // 为偶数的项目
  .item:nth-child(2n) {
    // 装文字的容器
    .text-wrapper {
      margin-right: 0px;
      order: 8;
    }
    // 给图片设置向左移动的动画
    .img-animate {
      animation: goRight 0.7s ease-in forwards;
    }
  }
  // 设置第三个项目
  .item:nth-child(3) {
    display: block;
  }
  .content-wrapper {
    flex-direction: column;
    // 装图片的容器
    .img-wrapper {
      width: 100%;
    }
    // 装文字的容器
    .text-wrapper {
      width: 100%;
      padding: 0;
      margin-top: 40px;
    }
  }
}

// 屏幕宽度小于 576 像素
@media screen and (max-width: 576px) {
  .content-wrapper {
    // 装文字的容器
    .text-wrapper {
      box-sizing: border-box;
      padding: 20px 15px 0;
    }
  }
}
</style>
