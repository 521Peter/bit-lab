<template>
    <div>
        <h3>编辑个人信息</h3>
        <br/>
        <br/>
        <div class="myForm">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="姓名">
                <el-input v-model="form.name" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="form.nickName" placeholder="请输入新昵称"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="form.gender">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="0">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="城市">
                <el-input v-model="form.city" placeholder="请输入所在城市，如”广东茂名"></el-input>
              </el-form-item>
              <el-form-item label="学院">
                <el-input v-model="form.institute" placeholder="请输入所在学院"></el-input>
              </el-form-item>
              <el-form-item label="专业">
                <el-input v-model="form.major" placeholder="请输入所学专业全称"></el-input>
              </el-form-item>
              <el-form-item label="组别">
                <el-select v-model="form.groupx" placeholder="请选择组别">
                  <el-option label="Java" value="Java"></el-option>
                  <el-option label="Python" value="Python"></el-option>
                  <el-option label="前端" value="前端"></el-option>
                  <el-option label="硬件" value="硬件"></el-option>
                  <el-option label="新媒体技术" value="新媒体技术"></el-option>
                  <el-option label="网络安全" value="网络安全"></el-option>
                  <el-option label="无" value="无"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="个性签名">
                <el-input
                  id="signature"
                  type="textarea"
                  v-model.trim="form.signature"
                  :rows="3"
                  maxlength="50"
                  resize="none"
                >
                </el-input>
              </el-form-item>
              <el-form-item>  
                <el-button type="primary" @click="onSubmit"  :plain="true">立即保存</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { getUserInfo, updataUserInfo } from '@/network/account/account';

export default {
    name:"MyChange",
    // created() {
    //     this.userInfo();
    // },
    data() {
      return {
        form: {},
      }
    },
    created() {
      this.userInfo();
    },
    methods: {
      onSubmit() {
          updataUserInfo(this.form).then(res=>{
            if(res.code == 200){
              this.userInfo();
              this.$store.commit("getUserInfo", this.form);
              sessionStorage.setItem(
                "userInfoList",
                JSON.stringify(this.form)
              );
              this.$message({
                message: '恭喜你，保存成功！',
                type: 'success'
              });
              this.timer = setTimeout(()=>{   //设置延迟执行
                this.$router.go(0);
              },1000);
            }else{
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
      // 获得当前用户的信息
      async userInfo() {
        try {
          // 调用获取用户信息的api请求 , 并解构出data, 重命名为res
          const { data: res } = await getUserInfo();
          // console.log(res);
          // 赋值
          this.form = res;
          // console.log(this.form);
        } catch (err) {
          console.log(err);
        }
      },
      
  }
}
</script>

<style lang="scss" scoped>
.myForm{
    width: 80%;
    margin-left: 50px;
}
</style>