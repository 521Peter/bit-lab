<template>
  <div class="login">
    <!-- 左侧背景图区域 -->
    <div class="login_container">
      <div class="login_img"></div>
      <div class="login_form">
        <h2 class="title">欢迎登录</h2>
        <h3>BIT-LAB Administrator</h3>
        <!-- 登录表单 -->
        <el-form
          class="login-input-items"
          :model="userInfo"
          :rules="rules"
          label-width="0px"
          ref="LoginFormRef"
        >
          <span>邮箱 / 手机</span>
          <el-form-item prop="username">
            <el-input v-model="userInfo.username"></el-input>
          </el-form-item>
          <span>密码</span>
          <el-form-item prop="password">
            <el-input
              v-model="userInfo.password"
              type="password"
              prefix-icon="iconfont icon-3702mima"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
        <button class="btn-login" @click="loginClick">登录</button>
      </div>
    </div>
  </div>
</template>
<script>
// 1. 按需导入辅助方法
import { mapMutations } from "vuex";
import { login } from "network/login/login";
export default {
  name: "login",
  data() {
    return {
      userInfo: {
        username: "",
        password: ""
      },
      //输入的字符规则
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 1,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码~~", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(["updatauser"]),
    loginClick() {
      if (
        this.userInfo.password.length >= 6 &&
        this.userInfo.password.length < 15
      ) {
        console.log(this.userInfo);
        login(this.userInfo)
          .then(res => {
            if (res.code == "200") {
              console.log(res.data.user.role, res.data.sessionId);
              if (res.data.user.role) {
                this.updatauser(res.data.user);
                window.sessionStorage.setItem("session", res.data.sessionId);
                // alert("登录成功");
                this.$router.push("/admin");
              } else {
                this.$message.error("您不是管理员哦，建议先加入我们！");
                this.$router.push("/about");
              }
            } else {
              this.$message.error("登录失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
// @import "assets/css/content.scss";
$bgImg: "~assets/img/login/bg_img.png";
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login_container {
    width: 1200px;
    height: 600px;
    padding: 50px;
    box-sizing: border-box;
    background-color: rgb(232, 236, 248);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0.6px 1.1px 2.7px rgba(0, 0, 0, 0.022),
      1.6px 2.9px 6.9px rgba(0, 0, 0, 0.031),
      3.2px 5.8px 14.2px rgba(0, 0, 0, 0.039),
      6.6px 12px 29.2px rgba(0, 0, 0, 0.048), 18px 33px 80px rgba(0, 0, 0, 0.07);

    .login_img {
      width: 500px;
      height: 70%;
      background: url($bgImg);
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      box-shadow: 0.6px 1.1px 2.7px rgba(0, 0, 0, 0.022),
        1.6px 2.9px 6.9px rgba(0, 0, 0, 0.031),
        3.2px 5.8px 14.2px rgba(0, 0, 0, 0.039),
        6.6px 12px 29.2px rgba(0, 0, 0, 0.048),
        18px 33px 80px rgba(0, 0, 0, 0.07);
    }

    .login_form {
      position: relative;
      width: 330px;
      height: 90%;
      background-color: #fff;
      padding-left: 40px;
      box-sizing: border-box;
      padding-top: 65px;
      box-shadow: 0.6px 1.1px 2.7px rgba(0, 0, 0, 0.022),
        1.6px 2.9px 6.9px rgba(0, 0, 0, 0.031),
        3.2px 5.8px 14.2px rgba(0, 0, 0, 0.039),
        6.6px 12px 29.2px rgba(0, 0, 0, 0.048),
        18px 33px 80px rgba(0, 0, 0, 0.07);

      .title {
        display: none;
      }
      .login-input-items {
        width: 250px;
      }
      h3 {
        color: rgb(5, 45, 205);
        margin-bottom: 35px;
      }
      span {
        position: absolute;
        top: 185px;
        left: 12%;
        color: grey;
        font-size: 13px;
        z-index: 999;

        &:first-child {
          top: 120px;
        }
      }

      .btn-login {
        margin-top: 36px;
        width: 110px;
        height: 40px;
        border-radius: 26px 26px 26px 26px;
        background-color: rgb(1, 42, 252);
        border: none;
        color: #fff;
        font-weight: 700;
        cursor: pointer;

        &:active {
          border: none;
        }
        &:focus {
          border-radius: 26px 26px 26px 26px;
          background-color: rgb(1, 42, 252);
          border: none;
          outline: none;
        }
      }
    }
  }

  @media screen and(max-width:992px) {
    .login_container {
      height: 100%;

      .login_img {
        width: 0;
        height: 0;
      }
      .login_form {
        // width: 100%;
        height: 100%;
        padding-top: 35px;

        .title {
          display: block;
          margin-bottom: 35px;
        }

        span {
          position: absolute;
          top: 215px;
          left: 12%;
          color: grey;
          font-size: 13px;
          z-index: 999;

          &:first-child {
            top: 145px;
          }
        }
      }
    }
  }
}

>>> .el-input__inner {
  width: 240px;
  height: 44px;
  border: none;
  border-radius: 0;
  padding: 0px;
  padding-top: 4px;
  line-height: 44px;
  color: black;
  font-weight: 700;
  border-bottom: 1px solid black;
}
</style>
