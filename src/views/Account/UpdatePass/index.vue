<template>
  <div class="udatePass-box">
    <div class="passForm">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        @keyup.enter.native="onSubmit('form')"
        class="form"
      >
        <!-- 原密码 -->
        <el-form-item prop="oldPass">
          <el-input
            type="password"
            v-model.trim="form.oldPass"
            placeholder="原密码"
            autocomplete="off"
            show-password
          >
          </el-input>
        </el-form-item>
        <!-- 新密码 -->
        <el-form-item prop="newPass" class="formPass">
          <!-- 提示框 -->
          <span class="mask" :class="tipShow ? 'show' : ''">
            <div>长度为6~15个字符</div>
            <div>只允许出现字母、数字、下划线( _ )</div>
          </span>
          <el-input
            type="password"
            v-model.trim="form.newPass"
            placeholder="新密码"
            autocomplete="off"
            show-password
          >
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
          <el-input
            type="password"
            v-model.trim="form.checkPass"
            placeholder="确认密码"
            autocomplete="off"
            show-password
          >
          </el-input>
        </el-form-item>
        <!-- <button type="submit" @click="onSubmit('form')"></button> -->
        <input
          type="button"
          class="primary"
          :class="{ disable: disable }"
          :disabled="disable"
          value="修 改"
          @click="onSubmit('form')"
          @keydown.enter="onSubmit('form')"
        />
      </el-form>
    </div>
  </div>
</template>

<script>
import { modifyPass } from "network/account/account.js";
export default {
  data() {
    // 密码校验
    var validatePass = (rule, value, callback) => {
      const regPass = /^[\w]{6,15}$/;
      if (value === "") {
        callback();
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
      } else if (this.form.newPass === "") {
        this.$refs.form.validateField("newPass");
      } else if (value !== this.form.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 控制密码处的提示框是否显示
      tipShow: false,
      form: {
        oldPass: "",
        // 密码
        newPass: "",
        // 确认密码
        checkPass: "",
      },
      rules: {
        // 密码校验规则
        newPass: [{ validator: validatePass, trigger: "blur" }],
        // 确认密码校验规则
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 提交
    onSubmit(formName) {
      if (!this.disable) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            // 校验成功
            // 结构赋值出form对象
            const { form } = this;
            const res = await modifyPass(form.oldPass, form.newPass);
            if (res.code == 200) {
              this.$message({
                showClose: true,
                message: "修改成功！",
                type: "success",
                center: true,
              });
              this.$router.replace("/account/personInfo");
              this.$store.commit("modifyAccountNavIndex", 0);
            } else {
              // 修改失败
              this.$message({
                showClose: true,
                message: res.msg,
                type: "error",
                center: true,
              });
            }
          } else {
            // 校验失败
            return false;
          }
        });
      }
    },
  },
  computed: {
    // 控制注册按钮是否被禁用
    disable({ form }) {
      if (
        form.oldPass !== "" &&
        form.checkPass !== "" &&
        form.newPass !== "" &&
        form.newPass.length >= 6
      ) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/css/_content.scss";
.passForm {
  display: flex;
  justify-content: center;
  // border: 1px solid #ccc;
  border-top: 1px solid;
  border-bottom: 1px solid;
  @include border_color("accountBorderClr");
  // background-color: lightgrey;
  margin-top: 30px;
  padding-top: 30px;
  .el-form {
    width: 320px;
    // background-color: pink;
    /* 密码框 */
    .formPass {
      position: relative;
      /* 密码提示框 */
      .mask {
        position: absolute;
        z-index: 1;
        display: none;
        left: 77px;
        top: -68px;
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
      width: 200px;
      height: 40px;
      margin-top: 10px;
      @include background_color("btnBgc");
      border: none;
      color: #fff;
      font-weight: 700;
      cursor: pointer;
      margin-left: 65px;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      &:hover {
        @include background_color("btnBgc");
      }
    }
    /* 注册按钮禁用时的样式 */
    .disable {
      cursor: no-drop;
      opacity: 0.5;
      // background-color: rgba(#012afc, 0.4);
      @include background_color("btnBgc");
      box-shadow: 0px 0px 0px 0 transparent;
      &:hover {
        @include background_color("btnBgc");
      }
    }
    /* 控制密码框提示框显示 */
    .show {
      display: block !important;
    }
    /* 清除表单轮廓默认样式(验证失败时) */
    ::v-deep .el-form-item.is-error .el-input__inner {
      border-color: black;
    }
    /* 清除表单轮廓默认样式 */
    ::v-deep .el-input__inner {
      border-color: #dcdfe6;
      border-width: 0px;
      @include background_color("inpBgc");
      width: 100%;
      padding-right: 50px;
      padding-left: 15px;
      line-height: 44px;
    }
    ::v-deep .el-input__inner::placeholder {
      color: grey;
      font-size: 13px;
    }
    /* 图标默认摆放顺序反过来 */
    ::v-deep .el-input__suffix-inner {
      display: flex;
      flex-direction: row-reverse;
    }
  }
}
</style>
