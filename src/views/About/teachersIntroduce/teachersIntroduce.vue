<template>
  <section class="teachers-wrapper">
    <div class="contain" id="contain">
      <h2>实验室<span>老师</span></h2>
      <!-- 网格容器 -->
      <div class="grid">
        <!-- 每个子项目 -->
        <div class="item hasImg">
          <img :data-src="teacherInfo[0].urls[0]" v-lazy />
        </div>
        <div class="item hasText">
          <h6>{{ teacherInfo[0].name }}</h6>
          <p>
            <i class="iconfont icon-shoucang"></i> {{ teacherInfo[0].position }} 
          </p>
          <p>{{ teacherInfo[0].introducetext }}</p>
        </div>
        <div class="item hasImg">
          <img :data-src="teacherInfo[1].urls[0]" v-lazy />
        </div>
        <div class="item hasText">
          <h6>{{ teacherInfo[1].name }}</h6>
          <p>
            <i class="iconfont icon-shoucang"></i> {{ teacherInfo[1].position }}
          </p>
          <p>{{ teacherInfo[1].introducetext }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["teacherInfo"],
};
</script>

<style lang="scss" scoped>
@import "assets/css/_content.scss";

.teachers-wrapper {
  margin-top: 60px;
  .contain {
    padding: 0 15px;
    // 大字标题
    h2 {
      margin-bottom: 50px;
      text-align: center;
      font-size: 35px;
      @include font_color("mainTextClr");
      span {
        @include font_color("deputyTextClr");
      }
    }
    // 网格容器
    .grid {
      /* 设置网格布局 */
      display: grid;
      /* 声明列的宽度,数字4表示的重复4次，即有4列宽度为255px*/
      grid-template-columns: repeat(4, 255px);
      /* 声明行间距和列间距 */
      grid-gap: 31px;
      /* 表示1行的高度 */
      grid-template-rows: 306px;
      // 图片部分
      .hasImg {
        @include background_opacity("bgOpacity");
        transition: all 0.3s;
        // 多余的部分裁减掉
        overflow: hidden;
        // &:hover {
        //   box-shadow: 0 0 30px #24282f;
        // }
        img {
          height: 100%;
          width: 100%;
        }
      }
      // 文字部分
      .hasText {
        padding: 10px;
        overflow: auto;
        @include font_color("teacherTextClr");
        background-color: #a4a5ef;
        h6 {
          margin-bottom: 5px;
          font-size: 18px;
        }
      }
    }
  }
}

// 屏幕宽度小于 1200 像素
@media screen and (max-width: 1200px) {
  .teachers-wrapper {
    .contain {
      // 网格容器
      .grid {
        /* 声明列的宽度,数字4表示的重复4次，即有4列宽度为210px*/
        grid-template-columns: repeat(4, 210px);
        grid-template-rows: 252px;
        // 文字部分
        .hasText {
          font-size: 13px;
        }
      }
    }
  }
}

// 屏幕宽度小于 992 像素
@media screen and (max-width: 992px) {
  .teachers-wrapper {
    .contain {
      // 网格容器
      .grid {
        /* 声明列的宽度,有2列宽度为330px*/
        grid-template-columns: repeat(2, 330px);
        // 分别表示两行的高度
        grid-template-rows: 396px 396px;
        // 文字部分
        .hasText {
          padding: 20px 15px;
          h6 {
            font-size: 26px;
          }
          p {
            font-size: 18px;
            // 设置段落间距
            line-height: 26px;
          }
        }
      }
    }
  }
}

// 屏幕宽度小于 768 像素
@media screen and (max-width: 768px) {
  .teachers-wrapper {
    .contain {
      padding: 0;
      // 网格容器
      .grid {
        /* 声明列的宽度,有2列宽度为240px*/
        grid-template-columns: repeat(2, 240px);
        // 分别表示两行的高度
        grid-template-rows: 288px 288px;
        // 文字部分
        .hasText {
          padding: 10px;
          h6 {
            font-size: 20px;
          }
          p {
            font-size: 16px;
            // 设置段落间距
            line-height: 16px;
          }
        }
      }
    }
  }
}

// 屏幕宽度小于 576 像素
@media screen and (max-width: 576px) {
  .teachers-wrapper {
    .contain {
      padding: 0 15px;
      // 网格容器
      .grid {
        /* 声明列的宽度*/
        grid-template-columns: repeat(1, 100%);
        // 分别表示4行的高度(110vw相当于1.1倍的视口宽度)
        grid-template-rows: 110vw 300px 110vw 300px;
        overflow: auto;
        // 文字部分
        .hasText {
          padding: 20px 15px;
          h6 {
            font-size: 26px;
          }
          p {
            font-size: 18px;
            // 设置段落间距
            line-height: 26px;
          }
        }
      }
    }
  }
}
</style>
