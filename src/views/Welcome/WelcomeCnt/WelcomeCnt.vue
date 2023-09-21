<template>
  <div class="contain-welcomecnt WelcomeCnt-box" id="contain-welcomecnt">
    <!-- 工作室名称区域 -->
    <div class="Theme">
      <h1>比特巅峰</h1>
      <h2>工作室</h2>
    </div>
    <!-- btn区域 -->
    <div class="big-btn">
      <router-link to="enroll">新生报名</router-link>
      <router-link to="about">关于我们</router-link>
    </div>
  </div>
</template>

<script>
import '@/router/index.js'

export default {
  name: 'WelcomeCnt'
}
</script>

<style lang="scss" scoped>
@import 'assets/css/_content.scss';

$welcomeTextColor: #fff;

a {
  text-decoration: none;
}

.WelcomeCnt-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  z-index: 2;
  height: 100vh;
  .Theme {
    display: flex;
    flex-direction: column;
    color: $welcomeTextColor;
    text-shadow: 11px 6px 7px rgba(0,0,0,.7);
    user-select: none;

    h1 {
      font-size: 4rem;
      letter-spacing: 30px;
      transition: all 0.6s;
    }
    h2 {
      align-self: end;
      font-size: 2rem;
      letter-spacing: 20px;
      transition: all 0.6s;
    }
  }
  .big-btn {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 200px;
    margin-top: 100px;
    text-shadow: 7px 2px 4px rgba(0, 0, 0, 0.8);
    user-select: none;
    a {
      position: relative;
      padding: 1.7rem 5.5rem;
      border: 3px solid $welcomeTextColor;
      font-size: 20px;
      color: $welcomeTextColor;
      transition: all 0.6s;
      letter-spacing: 10px;
      box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
      &::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0.7em;
        right: 7.7em;
        margin-right: -4.8em;
        width: 9.3em;
        border-bottom: 3px solid $welcomeTextColor;
        box-shadow: 3px 2px 4px rgba(0, 0, 0, 0.7);
      }
    }
  }
}

// 屏幕宽度大于 1200 像素
@media screen and (min-width: 1200px) {
  .WelcomeCnt-box {
    padding: 0 150px;
  }
}
// 屏幕宽度小于 768 像素
@media screen and (max-width: 768px) {
  .WelcomeCnt-box {
    .Theme {
      h1 {
        font-size: 3rem;
      }
      h2 {
        font-size: 1.2rem;
      }
    }
    .big-btn {
      a {
        padding: 1.5rem 5rem;
        font-size: 16px;
        &::after {
          right: 8.4em;
        }
      }
    }
  }
}

// 屏幕宽度小于 576 像素 改变了布局
@media screen and (max-width: 576px) {
  .WelcomeCnt-box {
    flex-direction: column;
    justify-content: center;
    .Theme {
      h1 {
        font-size: 3rem;
      }
      h2 {
        font-size: 1.2rem;
      }
    }
    .big-btn {
      margin-top: 0;
      a {
        margin-top: 50px;
        padding: 1.5rem 5rem;
      }
    }
  }
}
</style>