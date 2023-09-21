<template>
  <div class="registerForm-box">
    <div class="registerForm-box1">
      <!-- 实验室logo -->
      <h1>注册</h1>
      <h4>已有账号？<router-link to="/login" replace>点此登录</router-link></h4>
      <!-- 表单 -->
      <section>
        <el-form :model="form" :rules="rules" ref="form" class="form" @keyup.enter.native="onSubmit('form')">
          <!-- 学号 -->
          <el-form-item prop="stuNum">
            <el-input v-model.trim="form.stuNum" placeholder="请输入学号"></el-input>
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item prop="email">
            <el-input v-model.trim="form.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="pass" class="formPass">
            <!-- 提示框 -->
            <span class="mask" :class="tipShow ? 'show' : ''">
              <div>长度为6~15个字符</div>
              <div>只允许出现字母、数字、下划线( _ )</div>
            </span>
            <el-input type="password" v-model.trim="form.pass" placeholder="请设置密码" autocomplete="off" show-password>
              <!-- 问号图标 -->
              <span
                slot="suffix"
                class="el-input__icon el-icon-question help"
                @click="tipShow = !tipShow"
              ></span>
            </el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item prop="checkPass">
            <el-input type="password" v-model.trim="form.checkPass" placeholder="请确认密码" autocomplete="off" show-password> </el-input>
          </el-form-item>
          <!-- 注册按钮 -->
          <input
            type="button"
            class="primary"
            :class="{ disable: disable }"
            :disabled="disable"
            value="注 册"
            @click="onSubmit('form')"
          />
        </el-form>
      </section>
    </div>
  </div>
</template>

<script>
// 导入
import { registerUserInfo } from 'network/register/register.js'
export default {
  name: "RegisterForm",
  data() {
    // 学号校验
    var validatestuNum = (rule, value, callback) => {
      const regstuNum = /^(\d{11})$/;
      if (value === "") {
        callback();
      } else if (!regstuNum.test(value)) {
        callback(new Error("学号格式不正确"));
      } else {
        // 查询手机号是否被注册
        /* const { code } = await querystuNum(value)
        if( code == 200 ){
          callback(new Error('该手机号已被注册'))
        } */
        callback();
      }
    };
    // 邮箱校验
    var validateEmail = (rule, value, callback) => {
      if (value == "") {
        callback();
      } else if (
        !/^^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$$/.test(value)
      ) {
        // 用正则判断邮箱格式
        callback(new Error("邮箱格式错误"));
      } else {
        /* 查询邮箱是否被注册 */
        /* const { code } = await queryMail(value)
          if( code == 200 ){
            callback(new Error('该邮箱已被注册'))
          } */
        callback();
      }
    };
    // 密码校验
    var validatePass = (rule, value, callback) => {
      const regPass = /^[\w]{6,15}$/
      if (value === '') {
        callback()
        // callback(new Error('请输入密码'))
      } else if (!regPass.test(value)) {
        callback(new Error("密码设置不符合要求"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    // 确认密码校验
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else if (this.form.pass === "") {
        this.$refs.form.validateField("pass");
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 控制密码处的提示框是否显示
      tipShow: false,
      form: {
        // 学号
        stuNum: "",
        // 邮箱
        email: "",
        // 密码
        pass: "",
        // 确认密码
        checkPass: ""
      },
      rules: {
        // 学号校验规则
        stuNum: [{ validator: validatestuNum, trigger: "blur" }],
        // 邮箱校验
        email: [{ validator: validateEmail, trigger: "blur" }],
        // 密码校验规则
        pass: [{ validator: validatePass, trigger: "blur" }],
        // 确认密码校验规则
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 提交
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 校验成功
          // 结构赋值出form对象
          const { form } = this;
          const res = await registerUserInfo(form.stuNum, form.email, form.pass);
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: '注册成功！',
              type: 'success',
              center: true
            })
            this.$router.replace("/login");
          } else {
            // 注册失败
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
              center: true
            });
          }
        } else {
          // 校验失败
          return false;
        }
      });
    }
  },
  computed: {
    // 控制注册按钮是否被禁用
    disable({ form }) {
      if (
        form.email !== "" &&
        form.stuNum !== "" &&
        form.checkPass !== "" &&
        (form.pass !== "" && form.pass.length >=6) 
      ) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="scss" scoped>
.registerForm-box {
  /* 让表单开启弹性布局*/
  display: flex;
  /* 注册模块 */
  .registerForm-box1 {
    padding: 70px 40px 40px 40px;
    box-sizing: border-box;
    width: 330px;
    transition: all 0.5s;
    background-color: #fff;
    box-shadow: 0.6px 1.1px 2.7px rgba(0, 0, 0, 0.022), 1.6px 2.9px 6.9px rgba(0, 0, 0, 0.031), 3.2px 5.8px 14.2px rgba(0, 0, 0, 0.039), 6.6px 12px 29.2px rgba(0, 0, 0, 0.048), 18px 33px 80px rgba(0, 0, 0, 0.07);
    /* 注册标题 */
    h1 {
      position: relative;
      margin: 0;
      font-size: 25px;
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
      color: rgb(5, 45, 205);
      /* logo */
      a {
        img {
          position: absolute;
          left: -7px;
          top: 3px;
          width: 60px;
        }
      }
    }
    /* 点击登录 标题 */
    h4 {
      margin: 10px 0;
      color: #ccc;
      font-size: 12px;
      font-weight: normal;
      a {
        margin-left: 10px;
        text-decoration: none;
        color: rgba($color: rgb(5, 45, 205), $alpha: 0.8);
        &:hover {
          color: rgb(5, 45, 205);
        }
      }
    }
    section {
      width: 100%;
      /* 表单域 */
      .form {
        position: relative;
        font-family: "Microsoft Yahei";
        /* 设置输入框外边距 */
        .el-form-item {
          position: relative;
          margin-bottom: 22px;
          /* 输入框左边图标 */
          i {
            position: absolute;
            left: -30px;
            top: 12px;
            font-size: 20px;
            color: #518dc4;
          }
          /* 密码框的问号图标 */
          .help {
            cursor: pointer;
             -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            &:hover {
              color: #909399;
            }
          }
        }

        /* 清除表单轮廓默认样式(验证失败时) */
        ::v-deep .el-form-item.is-error .el-input__inner {
          border-color: black;
        }
        ::v-deep .el-input {
           -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
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
        ::v-deep .el-input__inner::placeholder {
          color: grey;
          font-size: 13px;
        }
        /* 图标默认摆放顺序反过来 */
        ::v-deep .el-input__suffix-inner {
          display: flex !important;
          flex-direction: row-reverse !important;
        }
        /* 密码框 */
        .formPass {
          position: relative;
          /* 密码提示框 */
          .mask {
            position: absolute;
            z-index: 1;
            display: none;
            left: 8px;
            top: -75px;
            padding: 5px 10px 5px 15px;
            width: 220px;
            color: #fff;
            border-radius: 8px;
            border-bottom: none;
            font-size: 12px;
            background-color: rgba(#000000, $alpha: 0.8);
            /* 让遮罩层行高为文字的2.5倍 */
            div {
              line-height: 2.5;
            }
            /* 遮罩层的三角形 */
            &::after {
              position: absolute;
              right: 15px;
              bottom: -4px;
              content: "";
              transform: rotate(45deg);
              border: rgba($color: #000000, $alpha: 0.8) 6px solid;
              border-top-color: transparent;
              border-left-color: transparent;
            }
          }
        }
        //注册按钮样式
        .primary {
          transition: all 0.3s;
          width: 110px;
          height: 40px;
          margin-top: 10px;
          background-color: rgba($color: #012afc, $alpha: 0.8);
          border: none;
          color: #fff;
          font-weight: 700;
          cursor: pointer;
           -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          &:hover {
            background-color: rgb(1, 42, 252);
          }
        }
        /* 注册按钮禁用时的样式 */
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
  }
  /* 控制密码框提示框显示 */
  .show {
    display: block !important;
  }
}
  
</style>
