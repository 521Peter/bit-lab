<template>
  <div>
    <el-container class="all">
      <div class="top">
        <div class="topBar">
          <span class="title">个人主页</span>
        </div>
        <div class="box">
          <div class="headerMain">
            <div class="headPortrait">
              <img :src="userAvatar" class="avatar" alt="图片加载失败..." @error="setDefaultImage">
            </div>
          </div>
        </div>
        <div class="information" v-if="user.createTime">
            <span class="name">昵称：{{user.nickName}}</span>
            <span class="city">家乡：{{user.city}}</span>
            <br/>
            <span class="major">专业：{{user.major}}</span>
            <span class="group">组别：
              {{user.groupx}}
            </span>
            <br/>
            <span class="time">注册日期：{{user.createTime.substring(0,10)}}</span>
        </div>
      </div>
      <Aside></Aside>
      <el-footer class="footer">
        <BottomBar></BottomBar>
        <div>
        <p>版权所有 2022 Bit|保留所有权利 |由Bit Lab的实验室成员设计</p>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/views/PersonalCenter/Aside/Aside.vue";
// 底部模块
import BottomBar from "@/views/PersonalCenter/BottomBar/BottomBar.vue";
import { getUserInfo } from '@/network/account/account';


export default {
  name: "personalCenter",
  components: {
    Aside,
    BottomBar,
  },
  data(){
    return {
      user:[],
    }
  },
  created() {
    this.getInfo();
  },
  
  computed:{
    // 用户头像
    userAvatar() {
      return this.userInfo.imgUrl
    },
    // 用户信息
    userInfo() {
      return JSON.parse(sessionStorage.getItem("userInfoList"));
    },
  },
  methods: {
    // 图片加载失败后的处理逻辑，例如显示一张默认图片
    setDefaultImage(e) {
      this.$message({
        message: "图片加载失败",
        type: "error",
        center: true,
      });
      e.target.src = require("../../assets/img/topBar/avatar.png")
    },
    async getInfo() {
      try {
        // 调用获取用户信息的api请求 , 并解构出data, 重命名为res
        const { data: res } = await getUserInfo();
        // 赋值
        this.user = res;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  background-color: #f1f2f5;
}
.all {
  width: 1200px;
  margin: 0 auto;
}
.top {
  position: relative;
  width: 100%;
  height: 280px;
  background-image: url("../../assets/img/PersonalCenter/bj07.png");
  background-color: #939599;
}

.topBar {
  display: flex;
  width: 98%;
  height: 30px;
  padding: 13px;
  font-weight: 600;
  // border-bottom: 1px solid #6D6D6D;
  // background-color: #aab1bd87;
  background-color: #b1b1ae6f;
  // line-height: 30px;
  // text-align: center;
}
.topBar span {
  display: block;
  height: 30px;
  font-size: 18px;
  line-height: 30px;
}
.topBar .title {
  width: 80px;
  margin-left: 49%;
  // margin: 0 auto;//盒子水平居中
}
.box{
    display: flex;
    justify-content: center;
    align-items: center;
}
.headerMain {
    width: 400px;
    height: 12px;
    // background-color: aquamarine;
}
.headerMain .headPortrait {
    width: 120px;
    height: 120px;
    // background-color: #fff;
    border-radius: 50%;
    border: 2px solid #434647;
    margin: 10px 164px;
    background-size: 100%;
}
.headerMain .headPortrait img {
  //使图片自适应盒子
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.information {
    width: 230px;
    margin-top: 140px;
    margin-left: 520px;
    color: #fff;
    font-size: 14px;
    // font-weight: 520;
}
.information span {
  width: 108px;
  display:inline-block;
  height: 20px;
}
.information .time {
  width: 215px;
}
.information .city, .group{
  margin-left: 8px;
}
.footer {
  height: 200px !important;
  // background: #76d9d9
  // background: linear-gradient(#76d9d9,#fff);
    // background: linear-gradient(#fff,#cb95f8);

}
.footer p {
  width: 600px;
  margin-left: 374px;
  margin-top: 30px;
}
</style>
