<template>
  <div class="register-box">
    <div class="bgColor">
      <!-- 左边图片 -->
      <div class="leftImg"></div>
      <!-- 注册表单 -->
      <RegisterForm />
    </div>
  </div>
</template>

<script>
// 引入注册表单组件
import RegisterForm from 'views/Register/RegisterForm'

export default {
  name: 'Register',
  components: {
    RegisterForm
  }
}
</script>

<style lang="scss" scoped>
// 背景图片
$bgImg: '~assets/img/login/bg_img.png';
.register-box {
  /* 表单水平居中 */
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  .bgColor {
    width: 1200px;
    height: 600px;
    padding: 50px;
    box-sizing: border-box;
    background-color: rgb(232, 236, 248);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0.6px 1.1px 2.7px rgba(0, 0, 0, 0.022), 1.6px 2.9px 6.9px rgba(0, 0, 0, 0.031), 3.2px 5.8px 14.2px rgba(0, 0, 0, 0.039), 6.6px 12px 29.2px rgba(0, 0, 0, 0.048), 18px 33px 80px rgba(0, 0, 0, 0.07);
    .leftImg {
      width: 500px;
      height: 70%;
      background: url($bgImg);
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      box-shadow: 0.6px 1.1px 2.7px rgba(0, 0, 0, 0.022), 1.6px 2.9px 6.9px rgba(0, 0, 0, 0.031), 3.2px 5.8px 14.2px rgba(0, 0, 0, 0.039), 6.6px 12px 29.2px rgba(0, 0, 0, 0.048), 18px 33px 80px rgba(0, 0, 0, 0.07);
    }
  }
  @media screen and (max-width:992px) {
    .bgColor {
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: center;
      align-items: center;
      .leftImg {
        width: 0;
        height: 0;
      }
    }
  }
}
</style>
