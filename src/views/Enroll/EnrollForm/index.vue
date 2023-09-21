<template>
  <div class="enrollForm-box">
    <div class="el-row">
      <div class="el-col">
        <i class="iconfont icon-huitui" id="go-back" @click="goBack"></i>
        <!-- 标题 -->
        <h1>欢迎加入比特巅峰!</h1>
        <!-- 表单域 -->
        <el-form :model="form" ref="form" :rules="rules" label-width="80px">
          <!-- 姓名 -->
          <el-form-item prop="name">
            <label for="stuName" slot="label">姓&nbsp;&nbsp;名</label>
            <el-input id="stuName" type="text" v-model.trim="form.name" autocomplete="off" autofocus="true"></el-input>
          </el-form-item>
          <!-- 学号 -->
          <el-form-item prop="num">
            <label for="stuNum" slot="label">学&nbsp;&nbsp;号</label>
            <el-input id="stuNum" type="text" v-model.trim="form.num" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 手机号 -->
          <el-form-item prop="mobile">
            <!-- <span class="mask" :class="tipShow ? 'show' : ''"> -->
            <span class="mask" v-show="tipShow">
              <span>手机号一旦提交则不能更改</span>
            </span>
            <label for="stuPhone" slot="label">手机号</label>
            <el-input id="stuPhone" type="text" v-model.trim="form.mobile" autocomplete="off">
              <span slot="suffix" class="el-input__icon el-icon-question help" @click="tipShow = !tipShow"></span>
            </el-input>
          </el-form-item>
          <!-- 性别 -->
          <el-form-item prop="gender">
            <span slot="label">性&nbsp;&nbsp;别</span>
            <el-radio v-model="form.gender" :label="1">男</el-radio>
            <el-radio v-model="form.gender" :label="0">女</el-radio>
          </el-form-item>
          <!-- 年级 -->
          <el-form-item prop="grade">
            <span slot="label">年&nbsp;&nbsp;级</span>
            <el-radio v-model="form.grade" :label="0">大一</el-radio>
            <el-radio v-model="form.grade" :label="1">大二</el-radio>
            <el-radio v-model="form.grade" :label="2">大三</el-radio>
          </el-form-item>
          <!-- 学院 -->
          <el-form-item prop="institute">
            <label for="inst" slot="label">学&nbsp;&nbsp;院</label>
            <el-input id="inst" suffix-icon type="text" v-model.trim="form.institute" placeholder="计算机学院"
              autocomplete="off"></el-input>
          </el-form-item>
          <!-- 专业 -->
          <el-form-item prop="major">
            <label for="major" slot="label">专&nbsp;&nbsp;业</label>
            <el-input id="major" suffix-icon type="text" v-model.trim="form.major" placeholder="网络工程"
              autocomplete="off"></el-input>
          </el-form-item>
          <!-- 班级 -->
          <el-form-item prop="stuClass">
            <label for="stuClass" slot="label">班&nbsp;&nbsp;级</label>
            <el-input id="stuClass" type="text" v-model.trim="form.stuClass" autocomplete="off"
              placeholder="网络22-1"></el-input>
          </el-form-item>
          <!-- 方向 -->
          <el-form-item prop="groupx">
            <span slot="label">方&nbsp;&nbsp;向</span>
            <el-select v-model="form.groupx" placeholder="请选择">
              <el-option v-for="item in form.options" :key="item.group" :label="item.label" :value="item.group">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 申请理由 -->
          <el-form-item prop="reason">
            <label for="reason" slot="label">申请理由</label>
            <el-input id="reason" type="textarea" placeholder="请输入内容" v-model.trim="form.reason" maxlength="200"
              show-word-limit resize="none" :autosize="{ minRows: 1, maxRows: 2 }">
            </el-input>
          </el-form-item>
          <!-- 个人优势 -->
          <el-form-item>
            <label for="adv" slot="label">个人优势</label>
            <el-input id="adv" type="textarea" placeholder="请输入内容" v-model.trim="form.adv" maxlength="200" show-word-limit
              resize="none" :autosize="{ minRows: 1, maxRows: 2 }">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
          </el-form-item>
        </el-form>
        <!-- 底下文本 -->
        <span class="text"><img src="@/assets/img/lab_logo.png" alt="" title="比特巅峰" /> BIT
          SUMMIT · 2022</span>
      </div>
    </div>
  </div>
</template>

<script>
// 导入
import { saveStuInfo } from "network/enroll/enroll.js";
export default {
  name: "EnrollForm",
  data() {
    // 对姓名验证
    var validateName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入姓名"));
      } else if (!/^[\u4e00-\u9fa5A-Za-z·]{1,10}$/.test(value)) {
        callback(new Error("姓名需符合规范,且长度小于10个字符"));
      } else {
        callback();
      }
    };
    // 对学号验证
    var validateNum = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入学号"));
      } else if (!/^[0-9]{11}$/.test(value)) {
        // 用正则判断学号是否为11位数字
        callback(new Error("请检查学号是否正确"));
      } else {
        callback();
      }
    };
    // 对手机号验证
    var validateMobile = (rule, value, callback) => {
      const regMobile =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!regMobile.test(value)) {
        callback(new Error("手机号格式不正确"));
      } else callback();
    };

    return {
      // 控制手机号处的提示框是否显示
      tipShow: false,
      form: {
        // 姓名
        name: "",
        // 学号
        num: "",
        // 手机号
        mobile: "",
        // 学院
        institute: "",
        // 专业
        major: "",
        // 班级
        stuClass: "",
        // 个人优势
        adv: "",
        // 申请理由
        reason: "",
        // 方向选择
        options: [
          {
            group: 0,
            label: "待分配",
          },
          {
            group: 1,
            label: "Java",
          },
          {
            group: 2,
            label: "Python",
          },
          {
            group: 3,
            label: "前端",
          },
          {
            group: 4,
            label: "硬件",
          },
          {
            group: 5,
            label: "新媒体技术",
          },
          {
            group: 6,
            label: "网络安全",
          },
        ],
        // 方向(组别)
        groupx: "",
        // 性别
        gender: "",
        // 年级
        grade: "",
      },
      // 校验规则
      rules: {
        // 姓名校验
        name: [{ required: true, validator: validateName, trigger: "blur" }],
        // 学号校验
        num: [{ required: true, validator: validateNum, trigger: "blur" }],
        // 手机号校验
        mobile: [
          { required: true, validator: validateMobile, trigger: "blur" },
        ],
        // 性别校验
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        // 年级校验
        grade: [{ required: true, message: "请选择年级", trigger: "blur" }],
        // 学院校验
        institute: [
          { required: true, message: "请填写学院", trigger: "blur" },
          { min: 1, max: 20, message: "请不要超过20个字", trigger: "blur" },
        ],
        // 专业校验
        major: [
          { required: true, message: "请填写专业", trigger: "blur" },
          { min: 1, max: 20, message: "请不要超过20个字", trigger: "blur" },
        ],
        // 班级校验
        stuClass: [
          { required: true, message: "请填写班级", trigger: "blur" },
          { min: 1, max: 20, message: "请不要超过20个字", trigger: "blur" },
        ],
        // 方向校验
        groupx: [{ required: true, message: "请选择方向", trigger: "blur" }],
        // 理由校验
        reason: [{ required: true, message: "请说明理由", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 对整个表单进行校验
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 校验成功
          const res = await saveStuInfo(this.form);
          if (res.code == 200) {
            // 提交成功
            this.$message({
              showClose: true,
              message: "提交成功！",
              type: "success",
              center: true,
            });
            this.$router.push("/about");
          } else {
            // 提交失败
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
              center: true,
            });
          }
        } else {
          // 未满足校验规则
          return false;
        }
      });
    },
    // 返回按钮
    goBack() {
      this.$router.back();
    },
  },

};
</script>

<style lang="scss" scoped>
.enrollForm-box {
  display: flex;

  .el-row {
    .el-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      width: 375px;
      padding: 30px 0px;
      transition: all 0.5s ease;
      border-radius: 20px;
      background-color: #fff;
      box-shadow: 0px 0px 30px 0px #666;

      // 回退按钮
      #go-back {
        margin-right: auto;
        margin-left: 30px;
        font-size: 30px;
        cursor: pointer;
        transition: color .5s;

        &:hover {
          color: #518DC4;
        }
      }

      /* 表单标题 */
      h1 {
        font-size: 25px;
        color: #518dc4;
        text-align: center;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC",
          "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      }

      .el-form {
        display: flex;
        flex-direction: column;
        width: 335px;

        .el-form-item {
          position: relative;

          /* 表框的提示框 */
          .mask {
            position: absolute;
            z-index: 1;
            left: -10px;
            top: -40px;
            padding: 5px 10px 5px 15px;
            width: 180px;
            color: #fff;
            border-radius: 8px;
            font-size: 12px;
            line-height: 2.5;
            background-color: rgba(#000000, $alpha: 0.8);

            /* 提示框三角 */
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

        /* 手机号处的问号图标 */
        .help {
          position: absolute;
          left: -55px;
          top: 0px;
          cursor: pointer;

          &:hover {
            color: #909399;
          }
        }

        /* 修改表单默认样式 */
        ::v-deep .el-form-item.is-error .el-input__inner {
          border-color: #dcdfe6;
        }

        ::v-deep .el-input__inner {
          width: 180px;
          border-width: 0px;
          border-bottom: 1px solid #dcdfe6;
          border-radius: 0px;
        }

        /* 表框右侧的清除图标 */
        ::v-deep .el-input__suffix {
          right: 38px;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }

        ::v-deep .el-radio {
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }

        ::v-deep .el-select {
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          width: 220px;
        }

        /* 修改文本域默认样式 */
        ::v-deep .el-textarea__inner {
          border-color: #dcdfe6;
        }

        /* 修改文本域计数样式 */
        ::v-deep .el-textarea .el-input__count {
          background: transparent;
          bottom: -10px;
          right: 22px;
        }

        ::v-deep .el-radio__inner:hover {
          border-color: #dcdfe6;
        }

        /* 图标默认摆放顺序反过来 */
        ::v-deep .el-input__suffix-inner {
          display: flex !important;
          flex-direction: row-reverse !important;
        }

        /*  提交按钮 */
        .el-button {
          width: 120px;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          background-color: #518dc4;
        }

        .el-form-item:last-of-type {
          // 让提交按钮向右靠
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }

  /* 控制提示框显示 */
  .show {
    display: block !important;
  }

  /* 表单底下文本 */
  .text {
    display: inline-block;
    position: absolute;
    bottom: 7px;
    left: 50%;
    padding-left: 25px;
    transform: translateX(-50%);
    font-size: 10px;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    color: #9a9eac;
    overflow: hidden;

    /* 实验室logo */
    img {
      position: absolute;
      bottom: -3px;
      left: 0px;
      width: 20px;
    }
  }
}

@media screen and (min-width: 768px) {
  .el-col {
    width: 600px !important;
  }
}

@media screen and (min-width: 992px) {
  .el-col {
    width: 800px !important;
  }
}
</style>
