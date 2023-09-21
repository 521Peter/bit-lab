<template>
  <div class="app-container common-list-page">
    <h3>修改密码</h3>
    <br/>
    <el-form
      :model="resetForm"
      :rules="resetFormRules"
      ref="resetForm"
      status-icon
      label-width="100px"
    >
      <el-form-item label="旧密码：" prop="oldPassword">
        <el-input type="password" v-model="resetForm.oldPassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPassword">
        <el-input type="password" v-model="resetForm.newPassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="checkPass">
        <el-input type="password" v-model="resetForm.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="toAmend" :disabled="disable">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { modifyPass  } from '@/network/account/account'; //调用封装获取当前账户的username
export default {
  name:"ChangePassword",
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"));
      } else if (value.toString().length < 6 || value.toString().length > 18) {
        callback(new Error("密码长度为6-18位"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.resetForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 控制密码处的提示框是否显示
      tipShow: false,
      resetForm: {
      //传给后台所需要的参数
        newPassword: "",
        oldPassword: "",
        // 确认密码
        checkPass: "",
      },
      
      // 检验规则
      resetFormRules: {
        newPassword: [
            { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    // 控制注册按钮是否被禁用
    disable({ resetForm }) {
      if (
        resetForm.oldPassword !== "" &&
        resetForm.checkPass !== "" &&
        resetForm.newPassword !== "" &&
        resetForm.newPassword.length >= 6
      ) {
        return false;
      }
      return true;
    },
  },
  methods: {
    toAmend() {
      modifyPass(this.resetForm.oldPassword,this.resetForm.newPassword).then(res=>{
        if (res.code == 200) {
          this.$message.success("修改成功,3秒后跳转到登录页！");
          setTimeout(() => {
            this.$router.replace("/login");//调用跳转到登陆页的方法
            this.$store.commit("modifyAccountNavIndex", 0);
          }, 3000);
        } else {
          // 修改失败
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error",
            center: true,
          });
        }
      }).catch(err=>{
        console.log(err);
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.el-form {
  width: 60%;
  margin: 50px auto 0;
  text-align: center;
  button {
    margin: 20px 0 0;
  }
}
</style>