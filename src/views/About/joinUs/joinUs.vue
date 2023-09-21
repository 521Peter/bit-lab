<template>
  <div class="contain join-us-wrapper" id="contain">
    <div class="box">
      <h2>Join Us Right Now!</h2>
      <p>我们需要志同道合且有温暖的你</p>
      <el-button class="joinUsBtn" @click="joinUsBtnFn()"
        ><h3>加入我们</h3>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 点击加入我们按钮
    joinUsBtnFn() {
      // 跳转到填写表单页面
      this.$router.push("/enroll");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/css/_content.scss";

// 改变颜色的动画函数
@keyframes changeColor {
  0% {
    color: #fff;
    background-color: #5261f1;
  }
  100% {
    color: #5956ea;
    background-color: #fff;
  }
}

.join-us-wrapper {
  width: 1110px;
  padding: 80px 294px;
  // 向下移动
  transform: translateY(100px);
  text-align: center;
  color: #fff;
  background-color: #6776ea;
  // 设置渐变背景色
  background-image: linear-gradient(45deg, #a0a0f4, #6170de);
  @include background_opacity("bgOpacity");
  transition: all 0.6;
  .box {
    h2 {
      font-size: 38px;
    }
    p {
      margin: 46px 0;
      font-size: 19px;
    }
    .joinUsBtn {
      animation: changeColor 0.9s ease-in infinite alternate;
      &:hover {
        // 鼠标移动到按钮，暂停动画
        animation-play-state: paused;
      }
    }
  }
}

// 屏幕宽度小于 992 像素
@media screen and (max-width: 992px) {
  // 加入我们
  .join-us-wrapper {
    padding: 80px 0;
  }
}

// 屏幕宽度小于 768 像素
@media screen and (max-width: 768px) {
  // 加入我们
  .join-us-wrapper {
    padding: 48px 10px;
    .box {
      h2 {
        font-size: 34px;
      }
    }
  }
}
</style>
