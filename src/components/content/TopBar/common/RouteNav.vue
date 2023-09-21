<template>
  <ul>
    <!-- 用户头像模块 -->
    <div class="avatar" v-if="isLogined">
      <img :src="userAvatar" @error="setDefaultImage"/>
      <!-- 鼠标移动到头像后显示的内容 -->
      <div class="detail-content">
        <!-- 用户名 -->
        <p class="userName">{{ userName }}</p>
        <!-- 外部的功能盒子 -->
        <ul class="funciton-box">
          <!-- 线 -->
          <p class="line"></p>
          <!-- 个人功能模块 -->
          <li
            v-for="(item, index) in personFunctionModule"
            :key="index"
            @click="personFunction(item)"
          >
            <i :class="['iconfont ' + item.icon]"></i
            ><span>{{ item.text }}</span>
            <i class="iconfont icon-youjiantou1"></i>
          </li>
        </ul>
      </div>
    </div>
    <!-- 登录按钮 -->
    <!-- <li @click="jumpLogin()" class="login" v-else><span>登录</span></li> -->
    <!-- 路由导航模块 -->
    <li
      v-for="(obj, index) in menuData"
      :key="index"
      @click="jumpRoute(obj, index)"
      class="routeLead"
      :class="{ activeColor: index === activeIndex }"
    >
      <span>{{ obj.text }}</span>
    </li>
    <!-- 搜索按钮 -->
    <!-- <slot name="search"></slot> -->
    <!-- 夜间切换模块 -->
    <slot name="modeToggle"></slot>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      // 菜单数据
      menuData: [
        { text: "首页", name: "home" },
        { text: "关于我们", name: "about" },
        { text: "资料下载", name: "download" },
        // { text: "比赛详情", name: "detail" },
        { text: "新建文章", name: "createArticle" },
        // { text: "编辑文章", name: "editArticle" },
        { text: "打卡", name: "clock" },
      ],
      // 个人功能
      personFunctionModule: [
        { icon: "icon-user", text: "个人中心" },
        // { icon: "icon-book", text: "投稿管理" },
        { icon: "icon-exit", text: "退出登录" },
      ],
      // 用户信息(放在localStorage中)
      // userInfo: "",
      // 判断用户是否已经登录，为true则表示登录了
      isLogined: "",
      activeIndex: 0,
    };
  },
  computed: {
    // 用户头像
    userAvatar() {
      return this.userInfo.imgUrl;
    },
    // 用户名
    userName() {
      return this.userInfo.nickName || "用户" + this.userInfo.phone;
    },
    // 用户信息
    userInfo() {
      return JSON.parse(sessionStorage.getItem("userInfoList")) || "";
    },
  },
  methods: {
    // 图片加载失败后的处理逻辑，例如显示一张默认图片
      setDefaultImage(e) {
        e.target.src = require("assets/img/topBar/avatar.png")
      },
    // 跳转路由
    jumpRoute(obj, index) {
      this.activeIndex = index;
      console.log("activeIndex:", this.activeIndex);
      this.$router.push({ name: obj.name.toLocaleLowerCase() });
      this.$emit('closeMenu')
    },
    // 跳转到登录页面
    jumpLogin() {
      this.$router.push("/Login");
    },
    // 个人功能
    personFunction(item) {
      switch (item.text) {
        case "个人中心":
          this.$router.push("/personalCenter");
          break;
        case "投稿管理":
          break;
        case "退出登录":
          sessionStorage.removeItem("userInfoList");
          sessionStorage.removeItem("session");
          this.$router.replace("/");
          // 刷新页面
          this.$router.go(0);
          break;
      }
    },
  },
  mounted() {
    console.log("组件已经挂载");
    this.$bus.$on("updataTextColor", (index) => {
      this.activeIndex = index;
    });
  
    // 如果有用户信息，则用户已登录
    if (this.userInfo) {
      this.isLogined = true;
    }
  },
};
</script>

<style scoped lang="scss">
.routeLead span,
.login span {
  font-weight: 600;
}
.activeColor {
  color: #FFD404;
}
</style>
