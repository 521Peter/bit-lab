<template>
  <div class="login">
    <!-- 左侧背景图区域 -->
    <div class="login_container">
      <div class="login_img"></div>
      <div class="login_form">
        <h3>登录</h3>
        <h4>
          没有账号？
          <router-link to="/adminlogin">管理员</router-link>
          <router-link to="/register" replace>点此注册</router-link>
        </h4>
        <!-- 登录表单 -->
        <el-form class="login-input-items" :model="userInfo" @keyup.enter.native="loginClick">
          <el-form-item prop="username">
            <el-input
              v-model="userInfo.username"
              placeholder="学号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="userInfo.password"
              type="password"
              placeholder="密码不少于6位"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
        <button
          class="btn-login"
          @click="loginClick"
          :class="{ disable: disable }"
          :disabled="disable"
        >
          登录
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      userInfo: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async loginClick() {
      try {
        // 登录成功
        await this.$store.dispatch("userLogin", this.userInfo);
        this.$message({
          showClose: true,
          message: "登录成功！",
          type: "success",
          center: true
        });
        this.$router.replace("/");
      } catch (err) {
        if (typeof err == "string") {
          // 登录失败
          this.$message({
            showClose: true,
            // message: '账号或密码错误',
            message: err,
            type: "error",
            center: true
          });
        }
      }
    }
  },
  watch:{
    $route(){
      this.$router.go();
    }
  },
  computed: {
    // 控制注册按钮是否被禁用
    disable({ userInfo }) {
      if (
        userInfo.username !== "" &&
        userInfo.password !== "" &&
        userInfo.password.length >= 6
      ) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="scss" scoped>
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
        font-size: 25px;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      }
      h4 {
        margin: 10px 0;
        color: #ccc;
        font-size: 12px;
        font-weight: normal;
        margin-bottom: 20px;
        a {
          margin-left: 10px;
          text-decoration: none;
          color: rgba($color: rgb(5, 45, 205), $alpha: 0.8);
           -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          &:hover {
            color: rgb(5, 45, 205);
          }
        }
      }
      .el-form-item {
        ::v-deep .el-input__inner::placeholder {
          color: grey;
          font-size: 13px;
        }
      }
      /* 清除表单轮廓默认样式(验证失败时) */
      ::v-deep .el-form-item.is-error .el-input__inner {
        border-color: black;
      }
      /* 清除表单轮廓默认样式 */
      ::v-deep .el-input__inner {
        border-color: #dcdfe6;
        border-width: 0px;
        border-bottom: 1px solid black;
        border-radius: 0px;
        width: 240px;
        padding-right: 50px;
        padding-left: 0px;
        line-height: 44px;
      }
      .btn-login {
        margin-top: 36px;
        width: 110px;
        height: 40px;
        background-color: rgba($color: #012afc, $alpha: 0.8);
        transition: all 0.3s;
        border: none;
        color: #fff;
        font-weight: 700;
        cursor: pointer;
         -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        &:hover {
          background-color: rgb(1, 42, 252);
        }
      }
      .disable {
        cursor: no-drop;
        background-color: rgba(#012afc, 0.4);
        box-shadow: 0 0px 0px 0 transparent;
        &:hover {
          background-color: rgba(#012afc, 0.4);
        }
      }
    }
  }
  @media screen and (max-width:992px) {
    .login_container {
      width: 100%;
      height: 100%;
      .login_img {
        width: 0;
        height: 0;
      }
      .login_form {
        padding-top: 35px;
        height: 380px;
        .title {
          display: block;
          margin-bottom: 35px;
        }
      }
    }
  }
}

::v-deep .el-input__inner {
  width: 240px;
  height: 40px;
  border: none;
  border-radius: 0;
  padding: 0px;
  line-height: 44px;
  color: black;
  font-size: 13px;
  border-bottom: 1px solid black;
}
</style>
